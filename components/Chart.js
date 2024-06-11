export default {
    props: {
        ingresos: Number,
        gastos: Number
    },

    template: `
        <div id="chart" class="chart"></div>
    `,

    mounted() {
        this.draw();
    },

    methods: {
        draw() {
            const data = [{
                x: ['Ingresos', 'Gastos'],
                y: [this.ingresos, this.gastos],
                type: 'bar',
                marker: {
                    color: ['rgb(31, 119, 180)', 'rgba(222,45,38,0.8)']
                }
            }];

            const layout = {
                title: ''
            };
            
            //dibuja la grafica
            Plotly.newPlot('chart', data, layout);
        }
    },

    //caundo se actualice la propiedad, se llama el metodo
    watch: {
        ingresos: 'draw',
        gastos: 'draw'
      }
};