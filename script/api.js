document.addEventListener("DOMContentLoaded", function () {
    getRepositories()
})


async function getRepositories() {
    try {
        const response = await fetch("https://pdamgupfeslxupniapku.supabase.co/rest/v1/repositories?select=*", {
            method: "GET",
            headers: {
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYW1ndXBmZXNseHVwbmlhcGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MTYyOTksImV4cCI6MjAyMTM5MjI5OX0.9YF1m5roAJciaXBtJNOp60DxBGvNHL50fahbKMv4jnU"
            }
        })
        const data = await response.json();
        const rep = document.querySelector(".project_list")
        let html = '';
        data.forEach(project => {
            const frontendSkillsList = project.front.split(', ').map(skill => `<li>${skill}</li>`).join('');
            const backendSkillsList =project.back ? project.back.split(', ').map(skill => `<li>${skill}</li>`).join(''): '<li>-</li>';
            html += `
                 <div class="item_project">
      ${project.link_website ? `
        <div class="project_link_website">
          <a class="link_website" href="${project.link_website}">Website</a>
        </div>
      ` : ''}
      <span class="project_name">${project.name}</span>
      <div class="project_background" style="background-image: url('/image/${project.id}.png')">
        <div class="project_info">
          <div class="project_front">Frontend
            <ul>
            ${frontendSkillsList}
            </ul>
          </div>
          <div class="project_divider"></div>
          <div class="project_back">Backend
            <ul>
            ${backendSkillsList}
            </ul>
          </div>
          <div class="project_divider"></div>
          <div class="project_link_github">
            <a class="link_github" href="${project.link_github}">GitHub</a>
          </div>
        </div>
      </div>
      <div class="tap_mobile">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128">
          <path fill="currentColor" d="M42.3 24.5c.4 0 .8-.1 1.2-.2 1.5-.6 2.3-2.4 1.6-3.9L39.3 6.5c-.6-1.5-2.4-2.3-3.9-1.6-1.5.6-2.3 2.4-1.6 3.9l5.8 13.9C40 23.8 41.2 24.5 42.3 24.5zM31.8 31.2l-14.3-4.5c-1.6-.5-3.3.4-3.8 2-.5 1.6.4 3.3 2 3.8L30 36.9c.3.1.6.1.9.1 1.3 0 2.5-.8 2.9-2.1C34.3 33.3 33.4 31.7 31.8 31.2zM50.2 109.5c.6.2 1.2.4 1.8.4 1.4 0 2.7-.6 3.6-1.6l13.5-14.4 9.2 22.2c.5 1.2 1.6 1.8 2.8 1.8.4 0 .8-.1 1.2-.2 1.5-.6 2.3-2.4 1.6-3.9l-9.3-22.3h20.4c2 0 3.9-1.2 4.6-3.1.8-1.9.3-4-1.2-5.5L55.5 41.1c-1.4-1.4-3.6-1.8-5.4-1-1.9.8-3 2.6-3 4.6v60.2C47 107 48.2 108.8 50.2 109.5zM53 47.1l39.6 38.4H70.1c-.8 0-1.6.3-2.2 1l-14.9 16V47.1zM63.6 7.6l-7 13.3c-.8 1.5-.2 3.3 1.3 4 .4.2.9.3 1.4.3 1.1 0 2.1-.6 2.7-1.6l7-13.3c.8-1.5.2-3.3-1.3-4C66.2 5.6 64.4 6.1 63.6 7.6z"></path>
        </svg>
      </div>
    </div>
  `;
        });

        rep.innerHTML = html;
    } catch (err) {
        console.error(err)
    }
}

const botToken = "6271272669:AAFvdMfl_iTk-_VY-2G0nU_bBtTylsnZFhY";
const chatId = "952155820";

async function sendMessage() {
    document.querySelector('.telegram_send').addEventListener('submit', async function (e) {
        const message = document.querySelector('.text_contact').value;
        e.preventDefault()
        const res= await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text="првет"`)
        await console.log(res)
    });
}

