<script setup lang="ts">
import input_component from '@/components/form_components/input_component.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { userInfo } from 'os';

const signinForm = ref({ username: '', password: '' })


const router = useRouter()

const handleSubmit = () => {
  axios.post('users/signin?user_name', signinForm.value, { _load: true })
    .then(res => {
      console.log(res.data.status)
      if (res.data.status == 'success') {
        router.push({ name: 'dashboard' })
      }
    })

}


</script>
<template>

  <form @submit.prevent="handleSubmit()" class="mxpw h-flex mxph h-flex c-c   c-c ">
    <div class="v-flex fs-c gp05rem  max300 ">
      <div class="h-flex fs-c loginin">
        <div class="fss">
          <font-awesome-icon :icon="['fas', 'user']" size="xl" />
        </div>
        <input_component @inputed="e => signinForm.username = e.value" class="fg" name="username" label="User Name" />
      </div>

      <div class="h-flex rbg fs-c loginin">
        <div class="fss">
          <font-awesome-icon :icon="['fas', 'lock']" size="xl" />
        </div>
        <input_component @inputed="e => signinForm.password = e.value" class="fg" tp="password" name="password"
          label="Password" />
      </div>
      <button class="button mt1">
        SIGN IN
      </button>
    </div>


  </form>

</template>



<style scoped>
.loginin>div:first-child {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginin {
  width: 100%;
  height: 3rem;
  background-color: var(--color-background)
}

.button {
  height: 3rem;
  background-color: var(--color1);
  width: 100%;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  /* color: var(--color-text); */
}

.button:hover {
  background-color: var(--color1-soft);

}
</style>