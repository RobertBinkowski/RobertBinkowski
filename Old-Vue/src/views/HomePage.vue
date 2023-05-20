<template>
  <main>
    <WelcomeSection />
    <AboutSection />
    <TimelineSection />
    <ProjectsSection />
    <ContactSection />
  </main>
</template>

<style lang="scss" scoped></style>

<script>
  import WelcomeSection from "./HomePage/WelcomeSection.vue";
  import AboutSection from "./HomePage/AboutSection.vue";
  import ContactSection from "./HomePage/ContactSection.vue";
  import TimelineSection from "./HomePage/TimelineSection.vue";
  import ProjectsSection from "./HomePage/ProjectsSection.vue";

  export default {
    components: {
      WelcomeSection,
      AboutSection,
      ContactSection,
      TimelineSection,
      ProjectsSection,
    },
  };
</script>
