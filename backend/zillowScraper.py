from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("https://www.redfin.com/")
# assert "Python" in driver.title
elem = driver.find_element(By.ID, "search-box-input")

elem.clear()
elem.send_keys("25-31 Alexandria, Irvine, CA 92614")
elem.send_keys(Keys.ENTER)
time.sleep(10)
assert "No results found." not in driver.page_source
# driver.close(