<template>
    <footer>
        <logoSVG />
        <br>
        <ul id="contact">
            <a href="mailto:binkowski95@gmail.com" target="_self">
                <li>
                    <p class="fa-solid fa-envelope-open"></p>
                </li>
            </a>
            <a href="https://github.com/RobertBinkowski" target="_self">
                <li>
                    <p class="fa-brands fa-github"></p>
                </li>
            </a>
            <a href="https://www.linkedin.com/in/robert-binkowski-9bb565195/" target="_self">
                <li>
                    <p class="fa-brands fa-linkedin"></p>
                </li>
            </a>
            <a href="https://www.instagram.com/binkowski95/" target="_self">
                <li>
                    <p class="fa-brands fa-instagram"></p>
                </li>
            </a>
        </ul>
        <br>
        <p>This website was designed and built by <strong>Robert Binkowski</strong></p>
        <br>
        <div class="thanks">
            <p>Special Thanks</p>
            <p><a href="https://www.linkedin.com/in/veronika-leginusov%C3%A1-865a11109/" target="_self">Veronika Leginusová</a> -  Logo Design</p>
        </div>
    </footer>
</template>

<style lang="scss">
@import "../assets/scss/variables";

    footer {
        padding-top: 2em;
        padding-bottom: 3em;
        min-height: 10vh;
        li{
            font-size: 1.2em;
        }
        #contact{
            p{
                font-size: 1.2em;
            }
        
            &::after {
            content: "";
            background-color: $acc-2;
            height: 100px;
            display: block;
            width: 1px;
            margin: 0px auto -15px auto;
            }
        }
        li:hover {
            margin-top: -0.2em;
            margin-bottom: 0.2em;
        }
    }
</style>

<script>
import LogoSVG from '../components/LogoSVG.vue';

export default {
  name: 'app',
  components: {
    LogoSVG
  },
};
</script>
