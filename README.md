# <span style="color: #0074D9;">Image Resizer with Flask</span>

## <span style="color: #2ECC40;">Description</span>
**Image Resizer with Flask** is a powerful web application built using Python Flask as the backend. It simplifies the process of resizing and compressing images, which is especially useful for scenarios like filling online forms where meeting specific image requirements can be cumbersome. With this application, users can effortlessly upload their images, crop them if necessary, and have them resized and compressed to meet standard specifications with just a few clicks.

## <span style="color: #FF4136;">Features</span>
- **Image Upload**: Easily upload your images directly from your local system.
- **Smart Cropping**: Use the built-in cropping tool to adjust your image precisely.
- **Efficient Resizing**: Resize and compress images according to standard requirements.
- **User-Friendly Interface**: Navigate and operate the application seamlessly.

## <span style="color: #FF851B;">Requirements</span>
To run this application, you'll need the following:

- **Python 3.12.0**: Ensure you have Python installed on your system.
- **Flask**: Install Flask using `pip install flask`.
- **Pillow**: Install Pillow (PIL) for image processing: `pip install pillow`.
- **OpenCV-Python**: For additional image manipulation capabilities.
- **HTML/CSS Knowledge (Optional)**: Customize the frontend to your liking.

## <span style="color: #B10DC9;">Installation</span>
1. **Clone this Repository**: Download or clone this repository to your local machine.
2. **Navigate to the Project Directory**: Open a terminal and go to the project folder.
3. **Install Dependencies**: Run the following command to install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. **Run the Flask Application**: Execute the following command to start the Flask server:
    ```bash
    flask run
    ```
5. **Access the Application**: Open your web browser and visit `http://localhost:5000` to use the application.

## <span style="color: #FFDC00;">Usage</span>
1. **Upload an Image**: Open the application in your web browser and click the "Upload Image" button to select an image file from your local system.
2. **Crop (if Needed)**: Use the cropping tool to adjust the image as desired.
3. **Resize and Compress**: Click the "Resize and Compress" button to process the image.
4. **Download the Result**: Once processing is complete, the resized and compressed image will be available for download.
