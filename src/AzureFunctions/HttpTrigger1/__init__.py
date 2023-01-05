import logging
import azure.functions as func
from datetime import datetime

def main(req: func.HttpRequest) -> func.HttpResponse:

  name = req.params.get('name')

  logging.info(name)
  if not name:
    try:
      req_body = req.get_json()
    except ValueError:
      pass
  else:
    return func.HttpResponse('{ "test": "' + name + '", "date": "' + str(datetime.utcnow()) + '"}')
