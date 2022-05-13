from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from celery import Celery
from celery.schedules import crontab


app=Flask(__name__)
app.secret_key = "supersecretkey"
CORS(app)


#mail server configuration
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=465
app.config['MAIL_USERNAME']=''
app.config['MAIL_PASSWORD']=''
app.config['MAIL_USE_TLS']=False
app.config['MAIL_USE_SSL']=True

mail=Mail(app)


#celery configuration
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )


    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery

app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
app.config['CELERY_TIMEZONE'] = 'UTC'

# app.config['CELERYBEAT_SCHEDULE'] = {
#     'Every-2-sec' : {
#     'task' : 'return_something',
#     'schedule' : crontab(minute='*/1')
#     }
# }

celery = make_celery(app)




from app import view
from app.auth_backend import authentication_controller
from app.dashboard_backend import dashboard_controller
from app.authority_backend import authority_controller
from app.user_backend import user_controller
from app.communities_backend import communities_controller
from app.skill_backend import skill_controller
from app.network_backend import network_controller
from app.usage import usage_controller, usage_model

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls reverse_messages every 10 seconds.
    sender.add_periodic_task(20.0, usage_model.usage_update_func, name="usage update")
