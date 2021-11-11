export default class coffeeComponent {

    props = {}

    constructor(number) {
        this.props.number = number;
    }

    render() {
        if (!this.element) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.renderString(), 'text/html');
            this.element = doc.body.firstChild;
        }
        return this.element;
    }

    renderString() {
        return `
            <fieldset class="beverage card mb-3 mx-auto" style="max-width:36rem;" id="Beverage${this.props.number}">
            <div class="card body p-3">
            <div class="position-absolute" style="right:0; top:0;">
            <button class="btn btn-close" id="ButtonDelete${this.props.number}"></button>
            </div>
            <h4 class="beverage-count text-center">Напиток №${this.props.number}</h4>

            <label class="field mb-3 form-label">
            <span class="label-text">Я буду</span>
            <select class="form-select" name="beverage${this.props.number}">
                <option value="espresso">Эспрессо</option>
                <option value="capuccino" selected>Капучино</option>
                <option value="cacao">Какао</option>
            </select>
            </label>

            <div class="field mb-3">
            <span class="checkbox-label">Сделайте напиток на</span>
            <label class="checkbox-field form-check">
                <input class="form-check-input" type="radio" name="milk${this.props.number}" value="usual" checked />
                <span>обычном молоке</span>
            </label>
            <label class="checkbox-field form-check">
                <input class="form-check-input" type="radio" name="milk${this.props.number}" value="no-fat" />
                <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field form-check">
                <input class="form-check-input" type="radio" name="milk${this.props.number}" value="soy" />
                <span>соевом молоке</span>
            </label>
            <label class="checkbox-field form-check">
                <input class="form-check-input" type="radio" name="milk${this.props.number}" value="coconut" />
                <span>кокосовом молоке</span>
            </label>
            </div>

            <div class="field mb-3">
            <span class="checkbox-label">Добавьте к напитку:</span>
            <label class="checkbox-field form-check form-check-label">
                <input class="form-check-input" type="checkbox" name="options${this.props.number}" value="whipped cream" />
                <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field form-check form-check-label">
                <input class="form-check-input" type="checkbox" name="options${this.props.number}" value="marshmallow" />
                <span>зефирок</span>
            </label>
            <label class="checkbox-field form-check form-check-label">
                <input class="form-check-input" type="checkbox" name="options${this.props.number}" value="chocolate" />
                <span>шоколад</span>
            </label>
            <label class="checkbox-field form-check form-check-label">
                <input class="form-check-input" type="checkbox" name="options${this.props.number}" value="cinnamon" />
                <span>корицу</span>
            </label>
            </div>

            <div class="">
                <label for="addInfo" class="form-label">И еще вот что</label>
                <textarea name="details${this.props.number}" class="form-control" id="addInfo" rows="2"></textarea>
            </div>

            </div>
            </fieldset>
        `
    }
}