const express = require('express');
const fileupload = require('express-fileupload');
const { engine } = require('express-handlebars');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(fileupload());
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/css', express.static('./css'));
app.use('/imagens', express.static('./imagens'));

app.engine('Handlebars', engine({
    helpers: {
        condicionalIgualdade: function (a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'Handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', produtoRoutes);

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});