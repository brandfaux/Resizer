import base64
from flask import Flask, request, redirect, url_for, send_from_directory, render_template, flash, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import os
import io

app = Flask(__name__)
app.secret_key = 'supersecretkey'

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def resize_image_function(image_path, output_path, target_size=(160, 212), target_dpi=(200, 200), max_size=20000):
    with Image.open(image_path) as img:
        aspect_ratio = target_size[0] / target_size[1]
        new_height = target_size[1]
        new_width = int(aspect_ratio * new_height)
        img = img.resize((new_width, new_height), Image.LANCZOS)
        img = img.convert('RGB')  # Convert to RGB mode
        img.info['dpi'] = target_dpi

        # Compress and save the image
        for quality in range(85, 10, -5):
            img_bytes = io.BytesIO()
            img.save(img_bytes, format='JPEG', quality=quality)
            img_size = img_bytes.tell()
            if img_size <= max_size:
                img_bytes.seek(0)
                with open(output_path, 'wb') as f:
                    f.write(img_bytes.read())
                return

        raise ValueError("Unable to meet the file size requirement")

@app.route('/')
def index():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('index.html', files=files)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        flash("No file part")
        return redirect(url_for('index'))
    file = request.files['file']
    if file.filename == '':
        flash("No selected file")
        return redirect(url_for('index'))
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return redirect(url_for('crop_image', filename=filename))
    flash("File type not allowed")
    return redirect(url_for('index'))

@app.route('/crop_image', methods=['GET', 'POST'])
def crop_image():
    filename = request.args.get('filename')
    return render_template('crop.html', filename=filename)

@app.route('/resize_image', methods=['POST'])
def resize_image():
    data = request.get_json()
    image_data = data['image']
    filename = data['filename']
    target_size = tuple(data['target_size'])
    max_size = data.get('max_size', 20000)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    try:
        img_data = io.BytesIO(base64.b64decode(image_data.split(',')[1]))
        with open(filepath, 'wb') as f:
            f.write(img_data.read())
        resize_image_function(filepath, filepath, target_size=target_size, max_size=max_size)
        return jsonify({'success': True, 'filename': filename})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/upload_signature', methods=['POST'])
def upload_signature():
    if 'file' not in request.files:
        flash("No file part")
        return redirect(url_for('index'))
    file = request.files['file']
    if file.filename == '':
        flash("No selected file")
        return redirect(url_for('index'))
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return redirect(url_for('crop_signature', filename=filename))
    flash("File type not allowed")
    return redirect(url_for('index'))

@app.route('/crop_signature', methods=['GET', 'POST'])
def crop_signature():
    filename = request.args.get('filename')
    return render_template('crop.html', filename=filename, signature=True)

if __name__ == '__main__':
    app.run(debug=True)
