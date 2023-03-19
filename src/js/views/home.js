import Button from "../../components/commons/Button.vue";
import Input from "../../components/commons/Input.vue";
import { ref } from "vue";
export default {
  name: "Home",
  components: {
    Button,
    Input,
  },
  setup(props) {
    const title = ref("Home");
    const type = ref("submit");
    const test = () => {
      console.log(1);
    };
    return {
      title,
      type,
      test,
    };
  },
};
