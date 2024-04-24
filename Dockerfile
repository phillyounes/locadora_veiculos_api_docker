FROM python:3.12.3-slim-bullseye

WORKDIR /application

COPY . .

RUN rm -rf env
RUN rm -rf database
RUN rm -rf log

RUN pip3 install -r requirements.txt

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]