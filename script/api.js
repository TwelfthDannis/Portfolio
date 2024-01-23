document.addEventListener("DOMContentLoaded", function () {
    GetSupaBase()
})

/*
function GetGitHub() {
    const accessToken = "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";

    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/user/repos", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": `application/json`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const formattedData = data.map(repo => {
                        const {name, html_url, homepage} = repo;
                        return {
                            name,
                            html_url,
                            homepage
                        };
                    });
                    resolve(formattedData);
                } else {
                    reject(new Error("Data is not an array"));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

// Используем GetGitHub как промис
GetGitHub()
    .then(apiData => {
        console.log(apiData);
    })
    .catch(error => {
        console.error(error, "Error");
    });
*/


const RepoAndFilter= {}
function GetSupaBase() {
    document.querySelector('.filter_list').addEventListener('change', () => {
        const selectedLanguages = Array.from(document.querySelectorAll('.filter_list input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim());
        filterReposByLanguage(selectedLanguages);
    });

    fetch("https://pdamgupfeslxupniapku.supabase.co/rest/v1/repositories?select=*&order=id", {
        method: "GET", headers: {
            "apikey": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYW1ndXBmZXNseHVwbmlhcGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MTYyOTksImV4cCI6MjAyMTM5MjI5OX0.9YF1m5roAJciaXBtJNOp60DxBGvNHL50fahbKMv4jnU`,
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const repoContainer = document.querySelector('.repo');
                data.forEach(({id,link_github, link_website, description, language, name}) => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add("repo_item",`repo_item_${id}`);
                    repoItem.innerHTML = `
                        <div class="repo_name">${name}</div>
                        <div class="description">
                            <span class="description_span">${description}</span>
                        </div>
                        <div class="repo_link">
                            <a href="${link_github}" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 16 18">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            ${link_website ? `<a href="${link_website}" target="_blank">
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.5 9.035a9.004 9.004 0 0 0-17 0m17 0c.324.928.5 1.926.5 2.965a8.988 8.988 0 0 1-.5 2.966m0-5.931h-17m0 0A8.987 8.987 0 0 0 3 12a8.99 8.99 0 0 0 .5 2.966m0 0a9.004 9.004 0 0 0 17 0m-17 0h17"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c4.97-4.97 4.97-13.03 0-18-4.97 4.97-4.97 13.03 0 18z"/>
                                </svg>
                            </a>` : ''}`;
                    filter(language)
                    RepoAndFilter[id]=language
                    repoContainer.appendChild(repoItem);
                    repoItem.addEventListener("click", (event) => {
                        review(description,language,id)
                    });
                });
            } else {
                console.error("Данные не найдены");
            }
        })
        .catch(err => console.error(err))
}

function review(description,language,id) {
    let imgUrl=`../image/${id}.png`;
    const repoReview = document.querySelector('.repo_review');
    repoReview.innerHTML='';
    repoReview.innerHTML=`
        <div class="review_screenshot">
            <img class="screen" src=${imgUrl} alt="screenshot">
        </div>
        <div class="review_description">
            <div class="work">
                <span class="framework_name">Инструменты</span>
                <span class="framework_list">${language}</span>
            </div>
            <div class="work">
                <span class="framework_name">Описание</span>
                <span class="framework_list">${description}</span>
            </div>
        </div>
    `
}


const filterLang = new Set();

const filter = language => {
    language.split(', ').forEach(lang => filterLang.add(lang));
    const addFilter= document.querySelector(".filter_list")
    addFilter.innerHTML = "";
    Array.from(filterLang).forEach(lang => {
        const li = document.createElement("li");
        li.innerHTML = `
            <label class="name_lang">${lang}
                <input type="checkbox"/>
            </label>
        `;
        addFilter.appendChild(li);
    });
}


const filterReposByLanguage = (selectedLanguages) => {
    const repoItems = document.querySelectorAll('.repo .repo_item');
    repoItems.forEach(repoItem => {
        const id = repoItem.classList[1].replace('repo_item_', '');
        const languages = RepoAndFilter[id] || '';
        const repoLanguages = languages.split(', ').map(lang => lang.trim());
        const isVisible = selectedLanguages.length === 0 || selectedLanguages.some(lang => repoLanguages.includes(lang));
        repoItem.style.display = isVisible ? 'block' : 'none';
    });
};
