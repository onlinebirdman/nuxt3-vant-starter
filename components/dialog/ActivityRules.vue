<script setup lang='ts'>
const rules = ref([
  {
    title: '一、活动时间',
    paragraphs: ['2024年4月30日-2024年12月31日'],
  },
  {
    title: '二、活动对象',
    paragraphs: ['仅限中信银行实名客户参与，可在中信银行APP中绑定中信银行储蓄卡、信用卡或开通电子账户完成实名认证。'],
  },
  {
    title: '三、活动内容',
    paragraphs: [
      '1、用户首次参与活动可领取基金种子体验金，收下体验券可进行播种并开始活动。',
      '2、每个种子的成长周期为5个工作日，一共呈现四种形态的变化：种子-发芽-树苗-大树，每个用户在种子养成周期内仅可培育一颗种子直至该种子养成为大树的最终形态。本活动不定期上新种子，用户在养成初始种子后方可领养额外的基金种子，每个基金种子都将发放一张相关联的基金体验金，体验金使用规则详见下方。',
      '3、活动期间用户可通过任务进行积攒能量值，当能量值攒满100的时候可进行一次抽奖，抽奖次数不限，多攒多抽，每次攒满能量值时，抽奖机会加一次，能量值将归零。',
      '4、攒能量值活动任务分为每日任务，一次性任务和自动获取，每日任务为【每日施肥】，一次性任务为【分享】和【其他】，其中【分享】任务关联当前所领养的种子，即当前种子可提供一次分享获得能量值的机会；【其他】任务不定期出现，届时将会出现在活动页面上方通过悬浮气泡展示，可点击完成。【自动获取】将关联当前领养种子的基金产品，依据交易规则，产品每日进行净值的更新，产品的净值涨跌幅将会提供额外的每日能量值，产品所提供的关联涨跌幅能量值将依据产品类型的不同而定，具体规则以页面展示为准。',
      '5、种子养成树苗后，将在【我的树苗】自动生成养成成就，用户可自行查看。',

    ],
  },
  {

  },
])
</script>

<template>
  <DialogBase>
    <div class="img-活动规则弹窗">
      <ScrollView class="top-[164px] h-[568px] w-[529px] absolute-center-x">
        <template v-for="(rule, index) in rules" :key="index">
          <div class="mb-[20px]">
            <p class="font-size-[26px] color-#721B16 font-bold">
              {{ rule.title }}
            </p>
            <template v-for="(paragraph, index) in rule.paragraphs" :key="index">
              <p class="font-size-[24px] color-#721B16">
                {{ paragraph }}
              </p>
            </template>
          </div>
        </template>
      </ScrollView>
      <div class="top-[164px] w-[529px] absolute-center-x" />

      <ImageBox
        img="关闭"
        class="bottom-[-100px] absolute-center-x"
      />
    </div>
  </DialogBase>
</template>

<style lang='less' scoped>

</style>
