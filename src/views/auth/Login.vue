<template>
  <form
    @submit.prevent="login"
    class="row g-3 needs-validation"
    novalidate
    :class="{ 'was-validated': hasError }"
  >
    <div class="container-login">
      <div class="wrap-login row">
        <div class="login-pic js-tilt col-md-12 col-lg-6">
          <img :src="defaultAvatar" alt="" class="rounded-circle" />
        </div>
        <div class="validate-form col-md-12 col-lg-6">
          <span class="login100-form-title">Đăng nhập hệ thống</span>
          <div class="wrap-input100">
            <input
              v-model="user.email"
              type="text"
              class="input100 form-control form-control-sm"
              placeholder="Email"
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="bi bi-envelope"></i>
            </span>
          </div>
          <div class="wrap-input100">
            <input
              v-model="user.password"
              type="password"
              class="input100 form-control form-control-sm"
              placeholder="Mật khẩu"
              autocomplete="true"
              required
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="bi bi-lock"></i>
            </span>
          </div>

          <div v-if="messageErr.message">
            <div class="text-danger">{{ messageErr.message }}</div>
            <div v-for="err in messageErr.errors?.email" class="text-danger">
              {{ err }}
            </div>
            <div v-for="err in messageErr.errors?.password" class="text-danger">
              {{ err }}
            </div>
          </div>

          <div class="container-login100-form-btn">
            <button type="submit" class="login100-form-btn">Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { authStore } from "../../store/modules/authStore";
import { useRouter } from "vue-router";

const auth = authStore();
const router = useRouter();
const messageErr = ref({});
const hasError = ref(false);

const user = ref({
  email: "",
  password: "",
});

const login = async () => {
  const response = await auth.login(user.value);
  if (response.status == 200) await router.push({ name: "Home" });
  else {
    hasError.value = true;
    messageErr.value = response;
  }
};
</script>

<style scoped>
.container-login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f5f5f5 !important;
}

.wrap-login {
  display: flex;
  align-items: center;
  padding: 50px;
  background: #fff;
  border-radius: 10px;
  max-width: 690px;
  width: 100%;
}

.login-pic {
  text-align: center;
}

.login-pic img {
  width: 100%;
  max-width: 150px;
  transition: all 1s;
}

.login-pic img:hover {
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1);
}

.validate-form {
  text-align: center;
}

.login100-form-title {
  font-size: x-large;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input100 {
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
  display: block;
  width: 100%;
  background: #e8f0fe;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}

.input100 + .symbol-input100 {
  color: red;
}

input {
  outline: none;
  border: none;
}

.symbol-input100 {
  font-size: 1rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}

.login100-form-btn {
  font-size: 1.02rem !important;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #e02222;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

button {
  outline: none !important;
  border: none;
  background: 0 0;
}

a:focus {
  outline: none !important;
}

a {
  text-decoration: none;
}

.login100-form-btn:hover {
  background: #333;
}

@media only screen and (max-width: 992px) {
  .login100-form-title {
    margin-top: 1.5rem;
  }
}
</style>
