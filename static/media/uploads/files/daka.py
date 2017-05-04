# -*- coding: utf-8 -*-
import time
import re
import requests
from bs4 import BeautifulSoup


def get_t():
    return int(time.time() * 1000)


def login_kaoqin():
    url = "http://kaoqin.funshion.com/Account/SignIn"

    args = {
        "isRemember": "undefined",
        "loginName": "001975",
        "password": "52kaoqin"
    }

    res = requests.post(url, args)

    cookies = res.cookies
    return cookies


def get_dateview():
    cookies = login_kaoqin()
    t = get_t()
    url2 = "http://kaoqin.funshion.com/Staff/EmpRegisterData/AttendanceDateView?_h=909&_=%s" % t

    res2 = requests.get(url2, cookies=cookies)
    return res2.text


def _parse_data(html):
    soup = BeautifulSoup(html)
    tds = soup.find_all("td", {"data-click": "click"})
    r = re.compile(r"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}")
    res = []
    for td in tds:
        m = r.match(td.text)
        if m:
            res.append(m.group())
    return res


def get_dakai_data():
    cookies = login_kaoqin()
    url = "http://kaoqin.funshion.com/Staff/EmpRegisterData/RefreshRecordDetail"
    i = 1
    all_date_list = []
    while 1:
        args = {"PageIndex": i}
        res = requests.post(url, cookies=cookies, data=args)
        date_list = _parse_data(res.text)
        all_date_list.extend(date_list)
        if not date_list:
            break
        else:
            i += 1
    all_date_list.sort(reverse=True)
    return all_date_list


if __name__ == "__main__":
    from collections import defaultdict
    all_date_list = get_dakai_data()
    res = defaultdict(list)
    for daka in all_date_list:
        day, t = daka.split()
        res[day].append(daka)
    for day in sorted(res.keys(), reverse=True)[:10]:
        data = sorted(res[day])
        print data[0], "\t", data[-1]
