import Form from '../components/Form.js';
import Chart from '../components/Chart.js';

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            total_saving: 0,
            show_form: false,

            ingresos_main: 0, 
            gastos_main: 0
        }
    },
    methods: {
        //movement: devuelve el monto y el tipo de transaccion/movimiento
        save: function(movement) {
            const amount = Number(movement.amount);

            //gasto
            if (movement.type === '1') {
                this.total_saving -= amount;
                this.gastos_main += amount;
                return;
            }
            
            this.total_saving += amount;
            this.ingresos_main += amount;
        },

        showForm() {
            this.show_form = !this.show_form
        },

        total() {
            const format = new Intl.NumberFormat('en-US');
            return format.format(this.total_saving);
        }
    }
});

app.component('form-app', Form);
app.component('chart-app', Chart);
app.mount('#app');