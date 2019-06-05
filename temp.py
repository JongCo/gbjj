import os, sys

import json


try:
    from pathlib import WindowsPath as Path
    Path("a")
except:
    from pathlib import PosixPath as Path
    Path("a")


BASE_DIR = Path(os.getcwd())

def get_atd_list(*lecture_name:list):
    atd_dir = BASE_DIR.joinpath("resource", "stu-submit", lecture_name[0], lecture_name[1])
    atd_list = []
    for item in atd_dir.iterdir():
        atd_list.append(item.name)

    return atd_list

print(get_atd_list("Basic","python Basic 1"))



            