import requests
import time
import hashlib
import base64


DEVICE_ID = "8513efac-09ea-3709-b214-95b366f1a185"

def get_app_token():
    t = int(time.time())
    hex_t = hex(t)

    # 时间戳加密
    md5_t = hashlib.md5(str(t).encode('utf-8')).hexdigest()

    # 不知道什么鬼字符串拼接
    a = 'token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?{}${}&com.coolapk.market' \
        .format(md5_t, DEVICE_ID)

    # 不知道什么鬼字符串拼接 后的字符串再次加密
    md5_a = hashlib.md5(base64.b64encode(a.encode('utf-8'))).hexdigest()

    token = '{}{}{}'.format(md5_a, DEVICE_ID, hex_t)
    print(token)
    return token


def request():
    url = "https://api.coolapk.com/v6/main/indexV8?page=1"
    headers = {
        "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; MI 8 SE MIUI/9.5.9) (#Build; Xiaomi; MI 8 SE; PKQ1.181121.001; 9) +CoolMarket/9.2.2-1905301"
    }
    headers = {
        "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; MI 8 SE MIUI/9.5.9) (#Build; Xiaomi; MI 8 SE; PKQ1.181121.001; 9) +CoolMarket/9.2.2-1905301",
        "X-App-Id": "com.coolapk.market",
        "X-Requested-With": "XMLHttpRequest",
        "X-Sdk-Int": "28",
        "X-Sdk-Locale": "zh-CN",
        "X-Api-Version": "9",
        "X-App-Version": "9.2.2",
        "X-App-Code": "1903501",
        "X-App-Device": "QRTBCOgkUTgsTat9WYphFI7kWbvFWaYByO1YjOCdjOxAjOxEkOFJjODlDI7ATNxMjM5MTOxcjMwAjN0AyOxEjNwgDNxITM2kDMzcTOgsTZzkTZlJ2MwUDNhJ2MyYzM",
        "Host": "api.coolapk.com",
        "X-Dark-Mode": "0",
        "X-App-Token": get_app_token(),
    }

    resp = requests.get(url, headers=headers)
    print(resp.text)


if __name__ == '__main__':
    request()

