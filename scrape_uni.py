from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time
import pandas as pd

manager = ChromeDriverManager().install()
executable_path = {'executable_path': manager}
browser = Browser('chrome', **executable_path, headless = False)

table = {}

url = 'https://www.theguardian.com/education/ng-interactive/2021/sep/11/the-best-uk-universities-2022-rankings'
browser.visit(url)
time.sleep(1)
html = browser.html
soup = BeautifulSoup(html, 'html.parser')

column_2022 = soup.find_all('td', class_='c-table__data--rank2022')
list_2022 = []
for row in column_2022:
    value = row.text.strip()
    list_2022.append(value)

column_2021 = soup.find_all('td', class_='c-table__data--rank2021')
list_2021 = []
for row in column_2021:
    value = row.text.strip()
    list_2021.append(value)

institution = soup.find_all('a', class_='js-institution-link')
list_institution = []
for row in institution:
    value = row.text.strip()
    list_institution.append(value)

column_gscore = soup.find_all('td', class_='c-table__data--guardianScore')
list_gscore = []
for row in column_gscore:
    value = row.text.strip()
    list_gscore.append(value)

column_overall = soup.find_all('td', class_='c-table__data--percentSatisfiedOverall')
list_overall = []
for row in column_overall:
    value = row.text.strip()
    list_overall.append(value)

column_teaching = soup.find_all('td', class_='c-table__data--percentSatisfiedOverall')
list_teaching = []
for row in column_teaching:
    value = row.text.strip()
    list_teaching.append(value)

column_assessment = soup.find_all('td', class_='c-table__data--percentSatisfiedWithAssessment')
list_assessment = []
for row in column_assessment:
    value = row.text.strip()
    list_assessment.append(value)

column_stustaff = soup.find_all('td', class_='c-table__data--studentStaffRatio')
list_stustaff = []
for row in column_stustaff:
    value = row.text.strip()
    list_stustaff.append(value)

column_expend = soup.find_all('td', class_='c-table__data--expenditurePerStudent')
list_expend = []
for row in column_expend:
    value = row.text.strip()
    list_expend.append(value)

column_tariff = soup.find_all('td', class_='c-table__data--averageEntryTariff')
list_tariff = []
for row in column_tariff:
    value = row.text.strip()
    list_tariff.append(value)

column_value = soup.find_all('td', class_='c-table__data--valueAdded')
list_value = []
for row in column_value:
    value = row.text.strip()
    list_value.append(value)

column_career = soup.find_all('td', class_='c-table__data--careerProspects')
list_career = []
for row in column_career:
    value = row.text.strip()
    list_career.append(value)

column_continuation = soup.find_all('td', class_='c-table__data--continuation')
list_continuation = []
for row in column_continuation:
    value = row.text.strip()
    list_continuation.append(value)

table['year'] = 2022
table['rank'] = list_2022
table['last year rank'] = list_2021
table['institution'] = list_institution
table['guardian score / 100'] = list_gscore
table['Satisfied with course'] = list_overall
table['Satisfied with teaching'] = list_teaching
table['Satisfied with feedback'] = list_assessment
table['Student to Staff Ratio'] = list_stustaff
table['Spend per student /10'] = list_expend
table['Average Entry tariff'] = list_tariff
table['Value Added score /10'] = list_value
table['Career After 15 months'] = list_career
table['Continuation'] = list_continuation

table_df = pd.DataFrame(table)
table_df.to_csv('Resources/2022_data.csv', index=False, header=True)
