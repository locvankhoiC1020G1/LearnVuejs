export default {
  name: "Button",
  props: {
    title: {
      type: String,
      default: "Clicks",
    },
    type: {
      type: String,
      default: "button",
    },
    class: {
      type: String,
      default: "btn btn-primary",
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 50,
    },
    click: {
      type: Function,
      default: () => {},
    },
  },

  setup(props) {},
};
