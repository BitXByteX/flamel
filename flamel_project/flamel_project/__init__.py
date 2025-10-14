from .celery_config import app as celery_app


celery = celery_app

__all__ = ('celery_app', 'celery')
