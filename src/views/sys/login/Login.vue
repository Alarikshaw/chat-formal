<template>
  <div class="login">
    <div class="login-mask" />
    <div class="login-form-wrap">
      <div class="login-form mx-6">
        <div class="login-form__content px-2 py-10">
          <header>
            <h1>chat-formal</h1>
          </header>
          <Tabs
            @change="changeType"
            class="login-tab"
          >
            <TabPane
              key="login"
              tab="登录"
            > </TabPane>
            <TabPane
              key="register"
              tab="注册"
              force-render
            > </TabPane>
          </Tabs>
          <a-form
            class="mx-auto mt-10"
            :model="state.formData"
            :rules="state.formRules"
            ref="formRef"
          >
            <a-form-item name="username">
              <a-input
                size="large"
                v-model:value="state.formData.username"
                placeholder="username"
              />
            </a-form-item>
            <a-form-item name="password">
              <a-input-password
                size="large"
                visibilityToggle
                v-model:value="state.formData.password"
                placeholder="password"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                size="large"
                class="rounded-sm"
                :block="true"
                @click="login"
                :loading="state.loading"
              >{{ state.btnText }}</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref, toRaw } from 'vue';
import { Checkbox, Tabs } from 'ant-design-vue';

import { Button } from '/@/components/Button';
// import { BasicDragVerify, DragVerifyActionType } from '/@/components/Verify/index';

import { userStore } from '/@/store/modules/user';

// import { appStore } from '/@/store/modules/app';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  components: {
    //  BasicDragVerify,
    AButton: Button,
    ACheckbox: Checkbox,
    Tabs,
    TabPane: Tabs.TabPane,
  },
  setup() {
    const origin = {
      titleType: 'login', // 当前状态
      btnText: '登录', // 按钮相应文字
      formData: {
        username: 'username',
        password: '123456',
      }, // 表单数据
      loading: false, // 加载状态
      formRules: {
        username: [{ required: true, message: '填写用户名', trigger: 'blur' }],
        password: [{ required: true, message: '输入密码', trigger: 'blur' }],
      }, // 表单校验
    };
    const state = reactive(origin);
    console.log(state);
    async function changeType(type: string) {
      state.titleType = type;
      if (state.titleType === 'login') {
        state.btnText = '登录';
      } else if (state.titleType === 'register') {
        state.btnText = '注册';
      }
    }
    const formRef = ref<any>(null);
    const { notification } = useMessage();

    /**
     * 登录
     */
    async function handleLogin() {
      const form = unref(formRef);
      if (!form) return;
      let data = await form.validate();
      state.loading = true;
      if (state.titleType === 'register') {
        // createErrorModal({ title: 'Tip', content: '这是测试' });
        console.log('ceeateTime', data);
        data.createTime = new Date().valueOf();
        try {
          const userInfo = await userStore.getRegister(data);
          if (userInfo.code === 0) {
            notification.success({
              message: '注册成功',
              description: '欢迎来访',
              duration: 3,
            });
          } else {
            notification.error({
              message: '注册',
              description: userInfo.msg,
              duration: 3,
            });
          }
        } catch (e) {
          return e;
        } finally {
          state.loading = false;
        }
        return false;
      } else {
        try {
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              username: data.username,
            })
          );
          console.log('userInfo', userInfo);
          if (userInfo) {
            notification.success({
              message: '登录成功',
              description: '欢迎回来',
              duration: 3,
            });
          }
        } catch (error) {
        } finally {
          state.loading = false;
        }
      }
    }
    return {
      formRef,
      login: handleLogin,
      changeType,
      state,
    };
  },
});
</script>
<style lang="less">
@import (reference) '../../../design/index.less';

.login-form__locale {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
}

.login {
  position: relative;
  height: 100vh;
  min-width: 1200px;
  background: url(../../../assets/images/login/bannerimgs.jpg) no-repeat;
  background-size: 100% 100%;

  &-mask {
    display: none;
    height: 100%;
    //   background: url(../../../assets/images/login/login-in.png) no-repeat;
    background-position: 30% 30%;
    background-size: 80% 80%;

    .respond-to(xlarge, { display: block;});
  }

  &-form {
    position: relative;
    bottom: 60px;
    width: 400px;
    background: @white;
    //   border: 10px solid rgba(255, 255, 255, 0.5);

    border-width: 0;
    border-radius: 10px;
    background-clip: padding-box;
    .respond-to(xlarge, { margin: 0 120px 0 50px});

    &-wrap {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      width: 100%;
      height: 100%;
      // height: 90%;
      justify-content: center;
      align-items: center;
      .respond-to(xlarge, {
        // justify-content: flex-end;
          });
    }

    &__content.py-10 {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 60px 0 40px 0;
      border: 1px solid #999;
      border: none;
      border-radius: 2px;
      padding-top: 20px;
      .login-tab {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
      }
      header {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: inline-block;
          width: 48px;
        }

        h1 {
          margin-bottom: 0;
          font-size: 24px;
          text-align: center;
        }
      }

      form {
        width: 80%;
        margin-top: 10px;
      }
    }
  }
}
</style>
