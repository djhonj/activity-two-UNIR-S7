export default {
  data() {
    return {
      title: '',
      amount: 0,
      description: '',
      type: '0', //0: ingreso, 1: gasto
    }
  },
  template: `
    <div>
      <h2>Agregar movimiento</h2>
      <button type="button" aria-label="Close" class="close" v-on:click="closeForm">X</button>
    </div>
    <form method="post" v-on:submit.prevent="saveForm">
      <div class="form-container">
        <div>
          <label>Título*</label>
          <input type="text" v-model="title" class="input" required />
        </div>
        <div>
          <label>Monto*</label>
          <input type="number" class="input" min="0" v-model.number="amount" v-on:keyup="validateAmount"  required />
        </div>
        <div>
          <label>Descripción</label>
          <textarea v-model="description" class="input" />
        </div>
        <div>
          <label>Tipo de movimiento*</label>
          <label>
            <input type="radio" value="0" v-model="type" checked />
            <span>Ingreso</span>
          </label>
          <label>
            <input type="radio" value="1" v-model="type" />
            <span>Gasto</span>
          </label>
        </div>
        <div>
          <button type="submit">Agregar movimiento</button>
        </div>
      </div>
    </form>
  `,
  methods: {
    saveForm: function() {
      if (!validate.call(this)) {
        return;
      }

      const amount = this.amount;
      const movement = {
        amount,
        type: this.type
      }

      this.$emit('save-form', movement);

      this.title = '';
      this.type = '0';
      this.description = '';
      this.amount = 0;
      this.closeForm();
    },

    closeForm: function() {
      this.$emit('close-form');
    },

    validateAmount(e) {
      if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        return true;
      }

      e.preventDefault();
      return false;
    }
  }
};

const validate = function() {
  if (!this.amount || typeof this.amount !== 'number') {
    alert('Debe ingresar un monto valido');
    return false;
  }

  if (this.amount < 1) {
    alert('El monto ingresado debe ser mayor a cero.');
    return false;
  }

  if (this.title.trim() === '') {
    alert('Debe ingresar un título para el movimiento');
    return false; 
  }

  if (!['0', '1'].includes(this.type)) {
    alert('Debe ingresar un tipo de movimiento valido');
    return false; 
  }

  return true;
};