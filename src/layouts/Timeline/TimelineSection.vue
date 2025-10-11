<template>
    <section id="timelineSection">
        <h2>Timeline</h2>

        <div
            class="experience"
            v-for="opportunity in timeline"
            :key="opportunity"
        >
            <a :href="opportunity.link" target="_blank">
                <div>
                    <p>
                        <img
                            :src="opportunity.logo"
                            v-show="opportunity.logo"
                            :alt="opportunity.name + ' Icon'"
                            class="exp-logo"
                        /><br />
                        <strong>{{ opportunity.role }}</strong
                        ><br />
                        <em
                            >{{ opportunity.name }} -
                            {{ opportunity.location }}</em
                        ><br />
                        {{ opportunity.period }}
                    </p>
                    <br />
                    <p>
                        {{ opportunity.details }}
                    </p>
                    <div class="grid">
                        <em
                            v-for="icon in icons"
                            :key="icon"
                            :class="icon.icon"
                        ></em>
                    </div>
                </div>
                <div>
                    <img
                        v-show="opportunity.img"
                        :src="opportunity.img"
                        :alt="opportunity.name + ' Screenshot'"
                        class="exp-screen"
                    />
                </div>
            </a>
        </div>
        <h2>Skills Learned</h2>
        <div class="grid">
            <div class="experience">
                <a href="https://www.setu.ie/" target="_blank">
                    <p>
                        <img
                            src="../../assets/images/education/SETU/logo.png"
                            alt="College Logo"
                            class="img"
                        />
                        <br /><br />
                        <strong>Software Development</strong><br /><br />
                        <em>South East Technological University - Carlow</em
                        ><br />
                        August 2018 - JUNE 2022
                    </p>
                </a>
            </div>
            <div class="experience">
                <a href="https://www.setu.ie/" target="_blank">
                    <p>
                        <img
                            src="../../assets/images/education/SETU/logo.png"
                            alt="College Logo"
                            class="img"
                        />
                        <br /><br />
                        <strong>Class Representative</strong><br /><br />
                        <em>South East Technological University - Carlow</em
                        ><br />
                        August 2021 - May 2022
                    </p>
                </a>
            </div>
            <!-- <div class="experience">
                <a href="https://www.facebook.com/100376461368721/photos/a.138133117593055/139192507487116/?type=3" target="_blank">
                    <p>
                        <strong class="fa-solid fa-handshake-angle icon"></strong><br><br>
                        <strong>Volunteer Green Campus - Secretary</strong><br><br>
                        <em>Institute Of Technology - Carlow</em><br>
                        August 2019 - May 2020
                    </p>
                </a>
            </div> -->
        </div>
    </section>
</template>

<style lang="scss">
@import "@/style/variables";

#timelineSection {
    a {
        .exp-logo {
            height: 3em;
        }
    }

    .fa-brands {
        font-size: 2em;
    }
}
#educationSection {
    .grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .img {
        size: 2em;
        padding: 0.5em;
    }
}
</style>

<script>
export default {
    data() {
        return {
            timeline: [
                {
                    enabled: true,
                    type: "Job",
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
                    type: "Internship",
                    role: "Full Stack Developer",
                    link: "https://sykownochata.pl/",
                    location: "Poland",
                    logo: "../assets/logo/experience/logo.png",
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
