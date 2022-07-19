<template>
    <section id="educationSection">
        <h2>Skills Learned</h2>
        <div class="grid">
            <div class="experience">
                <a href="https://www.setu.ie/" target="_blank">
                    <p>
                        <img src="../assets/logo/CollegeLogo.png" alt="College Logo" class="img"> <br><br>
                        <strong>Software Development</strong><br><br>
                        <em>South East Technological University  - Carlow</em><br>
                        August 2018 - JUNE 2022
                    </p>
                </a>
            </div>
            <div class="experience">
                <a href="https://www.setu.ie/" target="_blank">
                    <p>
                        <img src="../assets/logo/CollegeLogo.png" alt="College Logo" class="img"> <br><br>
                        <strong>Class Representative</strong><br><br>
                        <em>Institute Of Technology - Carlow</em><br>
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
#educationSection{
    .grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .img{
        size: 2em;
        padding:.5em;
    }
    
}

</style>