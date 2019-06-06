from flask import Flask

import os

#플라스크 객체 생성
#__name__은 현재 이 코드를 실행시키고 있는 모듈을 가리킴
app = Flask(__name__)
app.secret_key = 'jongco'

#다른 곳에서 import할 때 이부분은 실행하지 않음
if __name__ == '__main__':
    from modules.views import *


#이건 다른곳에서 import할 때 서버키는것을 방지하는 것.
#import하면 안의 코드가 실행되기 때문에 접근을 한정한다.
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)