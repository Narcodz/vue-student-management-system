<template>
  <router-link class="student flex" :to="{ name: 'Student', params: { studentId: student.studentId } }">
    <div class="left flex">
      <span class="person">{{ student.firstName }}</span>
      <span class="tracking-number">#{{ student.nicPassport }}</span>
      <span class="due-date">{{ student.studentId }}</span>
      <span class="due-date">{{ student.programName }}</span>
      <span class="due-date">{{ student.degreeLevel }}</span>
      <span class="due-date">{{ student.applicationStatus }}</span>
      
    </div>
    <div class="right flex">
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "StudentComponent",
  props: ["student"],
};
</script>

<style lang="scss" scoped>
.student {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    justify-content: end;
  }
}
</style>
