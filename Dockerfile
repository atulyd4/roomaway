FROM python:3.10.6-bullseye
# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs
# install dependencies
RUN pip install --upgrade pip 
COPY ./requirements.txt /app
RUN pip install -r requirements.txt
# copy project
COPY . /app
RUN cd /app/frontend && npm install --legacy-peer-deps

ENV NODE_ENV production

RUN cd /app/frontend && npm run build
RUN python manage.py collectstatic 

EXPOSE 8000

CMD ["gunicorn", "finalproject.wsgi", "-b", "0.0.0.0", "--access-logfile", "-"]