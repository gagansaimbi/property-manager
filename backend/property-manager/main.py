"""
This is the main script for Detect_click_Notify Software.

By using this software, you agree to the terms and conditions outlined in the End User License Agreement (EULA).
Please review the EULA carefully before using this software.

For more information, see EULA.txt.
"""

# main.py
import pyautogui
import time
import requests
import keyboard  # To listen for key presses
from PIL import ImageGrab

# Telegram bot settings
TELEGRAM_TOKEN = '7193252474:AAE7it1_nsnF_uY1KD13c_u8WcCPN7W-YS4'
CHAT_ID = '635078316'
TELEGRAM_URL = f'https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage'

# Coordinates of the screen area to monitor (you may need to adjust these)
x, y, width, height = 0, 100, 800, 200  # Adjust based on your screen and region of interest

# Define the acceptable range of green colors (adjust these values as needed)
MIN_GREEN = (0, 100, 0)
MAX_GREEN = (100, 255, 100)

def is_color_green(pixel):
    r, g, b = pixel
    return MIN_GREEN[0] <= r <= MAX_GREEN[0] and \
           MIN_GREEN[1] <= g <= MAX_GREEN[1] and \
           MIN_GREEN[2] <= b <= MAX_GREEN[2] and \
           g > r and g > b

def find_green_pixels(screen):
    green_pixels = []
    for i in range(screen.width):
        for j in range(screen.height):
            if is_color_green(screen.getpixel((i, j))):
                green_pixels.append((i, j))
    return green_pixels

def click_on_green_pixels(green_pixels):
    if green_pixels:
        i, j = green_pixels[-1]  # Click the last green pixel
        # Perform auto click
        pyautogui.click(x + i, y + j)
        print(f"Clicked at position ({x + i}, {y + j}).")

        # Send notification to phone
        send_notification()

    # Stop the program
    return True

def send_notification():
    message = "Green color is detected on screen and clicked."
    data = {"chat_id": CHAT_ID, "text": message}
    requests.post(TELEGRAM_URL, data=data)

def main():
    print("Program is LIVE!")

    print("Initial screenshot taken.")

    action_performed = False  # Flag to track if action has been performed

    try:
        while True:
            # Check if the "Esc" key is pressed to stop the program
            if keyboard.is_pressed('esc'):
                print("Esc key pressed. Program terminated.")
                break

            # Get the current screenshot of the specified screen region
            current_screenshot = ImageGrab.grab(bbox=(x, y, x + width, y + height))

            # Find all green pixels
            green_pixels = find_green_pixels(current_screenshot)
            if green_pixels:
                print(f"Detected {len(green_pixels)} green pixels.")
                if click_on_green_pixels(green_pixels):
                    action_performed = True
                    break  # Exit loop after clicking and sending notification

            time.sleep(0.1)  # Check every 100 milliseconds
            print("Waiting for the next check...")

    except KeyboardInterrupt:
        print("Program terminated by user.")
    except Exception as e:
        print(f"An error occurred: {e}")

    # Check if action has been performed
    if action_performed:
        print("Action performed. Program stopped.")
    else:
        print("No action performed. Program stopped.")

if __name__ == '__main__':
    main()


"""
Detect_click_Notify Software - Copyright © 2024 Gagandeep Singh Saimbi.

All rights reserved.

For inquiries, contact Gagandeep Singh Saimbi:
- Email: gagansaimbi@gmail.com
- LinkedIn: https://www.linkedin.com/in/gagansaimbi/
- GitHub: https://github.com/gagansaimbi/
"""
