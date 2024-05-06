import os
import psutil
import time

chrome_processes = psutil.process_iter(["chrome.exe"])
discord_processes = psutil.process_iter(["discord.exe"])
zalo_processes = psutil.process_iter(["zalo.exe"])
edge_processes = psutil.process_iter(["msedge.exe"])
brave_processes = psutil.process_iter(["brave.exe"])

while True:
	if chrome_processes or discord_processes or zalo_processes or edge_processes or brave_processes:
		os.system("taskkill /f /im chrome.exe")
		os.system("taskkill /f /im discord.exe")
		os.system("taskkill /f /im zalo.exe")
		os.system("taskkill /f /im msedge.exe")
		os.system("taskkill /f /im brave.exe")
	else:
		time.sleep(10)