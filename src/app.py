from flask import request, render_template, Flask
import controller


app = Flask(__name__)

@app.get("/")
def index():
    characters = controller.get_my_characters()
    return render_template('index.html', characters=characters)

@app.get("/characters")
def characters():
    return controller.get_my_characters()

@app.post("/update/images")
def update_images():
    return controller.update_images()

@app.post("/fight")
def fight():
    return controller.fight_character(request.form.get('character'))

@app.post("/move")
def move():
    return controller.move_character(
        request.form.get('character'),
        request.form.get('x'),
        request.form.get('y'),
    )

@app.get("/characters/<string:name>")
def get_character(name):
    return controller.get_character(name)

@app.get("/maps/<string:x>/<string:y>")
def get_map(x, y):
    return controller.get_map(x, y)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)