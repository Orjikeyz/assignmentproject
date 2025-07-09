            let university_list_content = document.querySelector(".university-list-content")
            let searchInput = document.getElementById("searchInput")
            let data_info = document.getElementById("data-info")
            let loader = document.getElementById("loader")
            let searchBtn = document.getElementById("searchBtn")
            let queryName = "Middle"

            let modal_overlay = document.querySelector(".modal-overlay")
            let login_modal_container = document.querySelector(".login-modal-container")
            let closeLogin = document.getElementById("closeLogin")
            let register_modal_container = document.querySelector(".register-modal-container")
            let closeRegister = document.getElementById("closeRegister")

            // Login Modal Function
            function openLoginModal() {
                modal_overlay.style.display = "block"
                login_modal_container.style.display = "block"
            }

            closeLogin.addEventListener("click", function () {
                modal_overlay.style.display = "none"
                login_modal_container.style.display = "none"
            })


            // Register Modal Function
            function openRegisterModal() {
                modal_overlay.style.display = "block"
                register_modal_container.style.display = "block"
            }

            closeRegister.addEventListener("click", function () {
                modal_overlay.style.display = "none"
                register_modal_container.style.display = "none"
            })

            // Search Function
            searchBtn.addEventListener("click", function () {
                queryName = searchInput.value
                loader.style.display = "block"
                university_list_content.innerHTML = ""
                setTimeout(() => {
                    if (searchInput.value === "") {
                        data_info.style.display = "block"
                        loader.style.display = "none"
                        university_list_content.innerHTML = ""
                    } else {
                        getUniversities()
                        data_info.style.display = "none"
                        loader.style.display = "none"
                    }
                }, 3000);
            })

            async function getUniversities() {
                try {
                    let response = await fetch(`http://universities.hipolabs.com/search?name=${queryName}`, {
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }
                    })
                    let data = await response.json()

                    if (response.status === 200) {
                        data.slice(0, 30).forEach(item => {
                            university_list_content.innerHTML += `
                                <div class="university-list-grid">
                                    <h4>${item.name}</h4>
                                    <hr>

                                    <div class="university-list-info">
                                        <span>Domain</span>
                                        <span>${item.domains}</span>
                                    </div>

                                    <div class="university-list-info">
                                        <span>Country</span>
                                        <span>${item.country}</span>
                                    </div>

                                    <button><a href="${item.web_pages}">Visit Website</a></button>
                                </div>
                            `
                        });
                    }
                } catch (error) {
                    console.error("Server Fetch error:", error);
                    alert(error)
                }
            }

            setTimeout(() => {
                loader.style.display = "none"
                getUniversities()
            }, 3000);
