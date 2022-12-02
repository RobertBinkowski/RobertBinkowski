<template>
  <section id="experienceSection">
    <h2>Work</h2>
    <div class="experience" v-for="job in jobs" :key="job">
      <a :href="job.link" target="_blank">
        <div>
          <p>
            <img
              :src="job.logo"
              v-show="job.logo"
              :alt="job.name + ' Icon'"
              class="exp-logo"
            /><br />
            <strong>{{ job.role }}</strong
            ><br />
            <em>{{ job.name }} - {{ job.location }}</em
            ><br />
            {{ job.period }}
          </p>
          <br />
          <p>
            {{ job.details }}
          </p>
          <div class="grid">
            <em v-for="icon in icons" :key="icon" :class="icon.icon"></em>
          </div>
        </div>
        <div>
          <img
            v-show="job.img"
            :src="job.img"
            :alt="job.name + ' Screenshot'"
            class="exp-screen"
          />
        </div>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
  @import "../assets/scss/variables";

  #experienceSection {
    a {
      .exp-logo {
        height: 3em;
      }
    }

    .fa-brands {
      font-size: 2em;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        jobs: [
          {
            enabled: true,
            name: "ID-Pal",
            role: "Junior PHP Developer",
            link: "https://www.id-pal.com/",
            location: "Ireland",
            logo: "",
            period: "November 2022 - Current",
            details:
              "Responsive, Mobile First Website designed to help advertise customers apartments.",
            img: "",
            icons: [
              { name: "HTML", icon: "fa-brands fa-html5" },
              { name: "SCSS", icon: "fa-brands fa-css3-alt" },
              { name: "PHP", icon: "fa-brands fa-php" },
              { name: "JavaScript", icon: "fa-brands fa-js" },
            ],
          },
          {
            enabled: true,
            name: "Sykowno Chata",
            role: "Full Stack Developer",
            link: "https://sykownochata.pl/",
            location: "Poland",
            logo: "../assets/logo/experience/logo_2.png",
            period: "June 2022 - October 2022",
            details:
              "Responsive, Mobile First Website designed to help advertise customers apartments.",
            img: "../assets/logo/experience/splashScreen.png",
            icons: [
              { name: "HTML", icon: "fa-brands fa-html5" },
              { name: "SCSS", icon: "fa-brands fa-css3-alt" },
              { name: "PHP", icon: "fa-brands fa-php" },
              { name: "JavaScript", icon: "fa-brands fa-js" },
            ],
          },
        ],
      };
    },
  };
</script>
