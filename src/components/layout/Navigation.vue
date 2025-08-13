<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-marginbottom">
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav mb-lg-0">
          <li
            v-for="link in navigation"
            :class="[`nav-item dropdown ${trimmedPathname.startsWith(link.url) ? 'activeMenu' : ''}`]"
          >
            <a class="nav-link py-3 px-4 dropdown-toggle" :class="{ mobile: isMobile }" id="navbarDropdown" :href="base_url(link.url)">
              {{ link.name }}
            </a>
            <ul class="dropdown-menu mt-0 shadow" aria-labelledby="navbarDropdown">
              <template v-for="pageLink in link.pages">
                <li :key="pageLink.url" v-if="pageLink.isExternal">
                  <a
                    class="dropdown-item externalLink"
                    :href="base_url(pageLink.url)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ pageLink.name }}
                  </a>
                </li>
                <template v-else-if="pageLink.pages && pageLink.pages.length > 0">
                  <li class="dropend">
                    <a :href="base_url(pageLink.url)" class="dropdown-item dropdown-toggle">
                      {{ pageLink.name }}
                    </a>
                    <ul class="dropdown-menu shadow">
                      <template v-for="subPageLink in pageLink.pages">
                        <li v-if="subPageLink.isExternal">
                          <a class="dropdown-item externalLink" :href="subPageLink.url">
                            {{ subPageLink.name }}
                          </a>
                        </li>
                        <template v-else-if="subPageLink.pages && subPageLink.pages.length > 0">
                          <li class="dropend">
                            <a :href="base_url(subPageLink.url)" class="dropdown-item dropdown-toggle">
                              {{ subPageLink.name }}
                            </a>
                            <ul class="dropdown-menu shadow">
                              <template v-if="subPageLink.pages && subPageLink.pages.length > 0">
                                <template v-for="grandChildLink in subPageLink.pages" :key="grandChildLink.url">
                                  <li v-if="grandChildLink.isExternal">
                                    <a class="dropdown-item" :href="base_url(grandChildLink.url)">
                                      {{ grandChildLink.name }}
                                    </a>
                                  </li>
                                  <li v-else>
                                    <a
                                      :class="[
                                        'dropdown-item',
                                        [
                                          'ITS Professional Capacity Building',
                                          'Architecture, Standards, and Cybersecurity (ASC)',
                                        ].includes(grandChildLink.name) && 'disabled',
                                      ]"
                                      :href="base_url(grandChildLink.url)"
                                    >
                                      {{ grandChildLink.name }}
                                    </a>
                                  </li>
                                </template>
                              </template>
                              <template v-else>
                                <li>
                                  <a
                                    :class="[
                                      'dropdown-item',
                                      [
                                        'ITS Professional Capacity Building',
                                        'Architecture, Standards, and Cybersecurity (ASC)',
                                      ].includes(subPageLink.name) && 'disabled',
                                    ]"
                                    :href="base_url(subPageLink.url)"
                                  >
                                    {{ subPageLink.name }}
                                  </a>
                                </li>
                              </template>
                            </ul>
                          </li>
                        </template>
                        <template v-else>
                          <li>
                            <a class="dropdown-item" :href="base_url(subPageLink.url)">{{ subPageLink.name }}</a>
                          </li>
                        </template>
                      </template>
                    </ul>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <a class="dropdown-item" :href="base_url(pageLink.url)">{{ pageLink.name }}</a>
                  </li>
                </template>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import base_url from "@/src/lib/base_url";
import { getTrimmedPathname, navigation } from "@/src/lib/navigation";

export default {
  data() {
    return {
      isMobile: false,
      navigation,
      pathname: window.location.pathname,
      base_url,
    };
  },
  computed: {
    trimmedPathname() {
      return getTrimmedPathname(this.pathname);
    },
  },

  // Makes navbar dropdowns open on hover
  // Ensure the DOM is fully loaded before running the script because Bootstrap's dropdown requires it
  mounted() {
    this.isMobile = window.innerWidth < 992;
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let dropdownShowTimeout;
    let dropdownHideTimeout;

    let currentDropdown;
    let lastDropdown;

    const adjustDropdownBehavior = () => {
      this.isMobile = window.innerWidth < 992;
      if (!this.isMobile) {
        const dropdownLinks = navbar.querySelectorAll(".dropdown-toggle");

        dropdownLinks.forEach((dropdownLink) => {
          // Initialize Bootstrap dropdown instance
          const dropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownLink);
          const dropdownMenu = dropdownLink.nextElementSibling;

          dropdownLink.addEventListener("mouseenter", () => {
            dropdownMenu!.classList.remove("fade-out");
            dropdownMenu!.classList.add("fade-in");

            currentDropdown = dropdownLink;
            if (currentDropdown === lastDropdown && dropdownHideTimeout) {
              clearTimeout(dropdownHideTimeout); // Clear the hide timeout if we're re-hovering the same dropdown
            }
            if (dropdownShowTimeout) {
              clearTimeout(dropdownShowTimeout); // Clear any existing timeout
            }
            dropdownShowTimeout = setTimeout(() => {
              dropdown.show();
            }, 200); // Delay before showing on hover
          });

          dropdownLink.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default link behavior
            const href = dropdownLink.getAttribute("href");
            if (!href || href === "#") return; // Ignore if no href or just a hash
            window.location.href = href; // Navigate to the link
          });

          // Add mouseleave listener to parent so that the dropdown closes when exiting link/sibling elements (dropdown menu)
          const parentElem = dropdownLink.closest("li");
          if (parentElem) {
            parentElem.addEventListener("mouseleave", () => {
              lastDropdown = currentDropdown; // Store the last hovered dropdown

              if (dropdownShowTimeout) {
                clearTimeout(dropdownShowTimeout); // Clear the timeout when leaving
              }

              dropdownHideTimeout = setTimeout(() => {
                dropdownMenu!.classList.remove("fade-in");
                dropdownMenu!.classList.add("fade-out");

                (dropdownLink as HTMLAnchorElement).blur(); // Removes :focus state from link

                dropdown.hide();
                dropdownMenu!.addEventListener(
                  "animationend",
                  () => {
                    dropdownMenu!.classList.remove("fade-out", "keep-visible");
                  },
                  { once: true }
                );
              }, 500); // Delay before hiding on mouse leave
            });
          }
        });
      }
    };
    adjustDropdownBehavior();
    window.addEventListener("resize", adjustDropdownBehavior);
  },
};
</script>

<style scoped>
a,
ul,
li,
nav,
button .show {
  transition: all 0.35s ease-in-out;
}

a:active {
  background: rgb(198, 198, 198);
  color: black;
}

.dotlogo {
  max-height: 25px;
  object-fit: contain;
  object-position: 0%;
  padding-right: 10px;
  margin-top: 14px;
  margin-left: 30px;
}

.dropdown-menu {
  left: -1px;
}

.dropdown-toggle.show {
  color: black;
  background-color: white;
  border-radius: 10px 10px 0px 0px;
}

.show.nav-link:focus {
  color: black;
}

.dropdown-menu li > ul.dropdown-menu {
  border-radius: 10px;
}

.dropend .dropdown-toggle:not(.mobile)::after {
  content: "\f054";
  border: 0;
  color: #009ad6;
}

.dropdown-item.dropdown-toggle.show:not(.mobile)::after {
  content: "\f078";
  border: 0;
  color: #009ad6;
}
.dropdown-item.dropdown-toggle.show {
  background: rgb(233, 236, 239);
  border-radius: 0;
}

.fade-in {
  animation: fade-in 0.35s ease-in-out;
}

.fade-out {
  animation: fade-out 0.35s ease-in-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media (max-width: 992px) {
  .navbar-marginbottom {
    margin-bottom: 0;
  }
}
.navbar-nav .nav-item.dropdown.show > .nav-link {
  font-weight: bold;
}

.dropend ul {
  margin-left: -0.1px !important; /* Prevents gap between dropend and menu items, which closes dropend on hover */
}
</style>
