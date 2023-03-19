import Button from "../../components/commons/Button.vue";
import Input from "../../components/commons/Input.vue";
import { ref,inject} from "vue";
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

    //use $config
    const config = inject("$config");
    return {
      title,
      type,
      test,
      config
    };
  },
};
