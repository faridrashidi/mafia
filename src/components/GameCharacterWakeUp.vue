<template>
  <Overlay
    class="final-cards"
  >
    <p>
      :ترتیب نقش‌ها برای بیدارشدن در سناریوهای مختلف
    </p>
    <br></br>
    <h2>بازپرس</h2>
    <ul>
      <li>۱. محقق</li>
      <li>۲. تیم مافیا</li>
      <li>۳. شیاد به تنهایی</li>
      <li>۴. کارآگاه</li>
      <li>۵. پزشک</li>
      <li>۶. بازپرس</li>
    </ul>
    <br></br>
    <h2>تکاور</h2>
    <ul>
      <li>۱. نگهبان</li>
      <li>۲. گروگان‌گیر (به تنهایی)</li>
      <li>۳. تیم مافیا (به جز گروگان‌گیر)</li>
      <li>۴. کارآگاه</li>
      <li>۵. تکاور</li>
      <li>۶. پزشک</li>
      <li>۷. تفنگ‌دار</li>
    </ul>
    <br></br>
    <h2>مذاکره</h2>
    <ul>
      <li>۱. تیم مافیا</li>
      <li>۲. کارآگاه</li>
      <li>۳. تک‌تیرانداز</li>
      <li>۴. پزشک</li>
      <li>۵. خبرنگار (اگر مذاکره شده باشد)</li>
    </ul>
    <br></br>
    <h2>زودیاک</h2>
    <ul>
      <li>۱. تیم مافیا (آلکاپن شات، شعبده‌باز افسون، بمب‌گذار بمب)</li>
      <li>۲. حرفه‌ای</li>
      <li>۳. دکتر</li>
      <li>۴. کارآگاه</li>
      <li>۵. تفنگ‌دار</li>
      <li>۶. اوشن</li>
      <li>۷. زودیاک</li>
    </ul>
    <br></br>
    <h2>جک‌گنجشکه</h2>
    <ul>
      <li>۱. تیم مافیا (پدرخوانده شات، ماتادور افسون، سوال‌گودمن خرید)</li>
      <li>۲. دکتر واتسون</li>
      <li>۳. لئون</li>
      <li>۴. همشهری‌کین</li>
      <li>۵. کنستانتین</li>
      <li>۶. جک‌گنجشکه</li>
    </ul>
    <br></br>
    <h2>نوستراداموس</h2>
    <ul>
      <li>۱. نوستراداموس (فقط شب معارفه)</li>
      <li>۲. تیم مافیا (پدرخوانده شات، ماتادور افسون، سوال‌گودمن خرید)</li>
      <li>۳. دکتر واتسون</li>
      <li>۴. لئون</li>
      <li>۵. همشهری‌کین</li>
      <li>۶. کنستانتین</li>
    </ul>
    <BaseButton
      class="white has-small-top-margin"
      @clicked="closeLog()"
    >
      <span>
        {{ $t('common.Close') }}
      </span>
    </BaseButton>
  </Overlay>
</template>

<script>

export default {
  name: 'GameCharacterWakeUp',
  methods: {
    closeLog () {
      this.$emit('close', 'wakeup')
    }
  }
}
</script>
  