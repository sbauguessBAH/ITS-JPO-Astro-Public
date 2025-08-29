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
            <a
              class="nav-link py-3 px-4 dropdown-toggle"
              data-open-on-mobile
              id="navbarDropdown"
              :href="base_url(link.url)"
            >
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
  props: {
    currentPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
      navigation,
      base_url,
      dropdownHandlers: new Map(), // Store element : handler mappings
      dropdownShowTimeout: null,
      dropdownHideTimeout: null,
      lastDropdown: null,
      currentDropdown: null,
    };
  },

  methods: {
    addToDropdownHandlersMap(elem, type, handler) {
      if (!this.dropdownHandlers.has(elem)) {
        this.dropdownHandlers.set(elem, []);
      }
      this.dropdownHandlers.get(elem).push({ elem, type, handler });
    },

    createBoostrapDropdown(dropdownLink) {
      const dropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownLink);
      return dropdown;
    },

    resetDropdownEventListeners() {
      const navbar = document.querySelector(".navbar");
      const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle");
      dropdownLinks.forEach((dropdownLink) => {
        if (this.dropdownHandlers.get(dropdownLink) != null) {
          this.dropdownHandlers.get(dropdownLink).forEach(({ elem, type, handler }) => {
            elem.removeEventListener(type, handler);
          });
          this.dropdownHandlers.get(dropdownLink.closest("li"))?.forEach(({ elem, type, handler }) => {
            elem.removeEventListener(type, handler);
          });
        }
        const dropdown = bootstrap.Dropdown.getInstance(dropdownLink);
        if (dropdown) {
          dropdown.dispose(); // Destroys dropdown instance, removing bootstrap's event listeners
        }
      });
      this.dropdownHandlers.clear();
    },

    handleMouseLeave(dropdown, dropdownMenu, dropdownLink) {
      this.lastDropdown = this.currentDropdown; // Store the last hovered dropdown

      if (this.dropdownShowTimeout) {
        clearTimeout(this.dropdownShowTimeout); // Clear the timeout when leaving
      }

      this.dropdownHideTimeout = setTimeout(() => {
        dropdownMenu!.classList.remove("fade-in");
        dropdownMenu!.classList.add("fade-out");

        (dropdownLink as HTMLAnchorElement).blur(); // Removes :focus state from link

        dropdown.hide();
        dropdownMenu!.addEventListener(
          "animationend",
          () => {
            dropdownMenu!.classList.remove("fade-out");
          },
          { once: true }
        );
      }, 500); // Delay before hiding on mouse leave
    },

    handleMouseEnter(dropdown, dropdownMenu, dropdownLink) {
      dropdownMenu!.classList.remove("fade-out");
      dropdownMenu!.classList.add("fade-in");

      this.currentDropdown = dropdownLink;
      if (this.currentDropdown === this.lastDropdown && this.dropdownHideTimeout) {
        clearTimeout(this.dropdownHideTimeout); // Clear the hide timeout if we're re-hovering the same dropdown
      }
      if (this.dropdownShowTimeout) {
        clearTimeout(this.dropdownShowTimeout); // Clear any existing timeout
      }
      this.dropdownShowTimeout = setTimeout(() => {
        dropdown.show();
      }, 200); // Delay before showing on hover
    },

    handleClick(e, dropdownLink, dropdown) {
      e.preventDefault(); // Prevent default link behavior
      const href = dropdownLink.getAttribute("href");
      if (!href || href === "#") return; // Ignore if no href or just a hash

      // Check if on mobile and if the dropdown should open on mobile (top-level dropdowns only)
      const openOnMobile = dropdownLink.getAttribute("data-open-on-mobile");

      // Check if on mobile for custom behavior, otherwise navigate to link
      if (this.isMobile && openOnMobile != null) {
        const navbar = document.querySelector(".navbar");
        const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle");

        // If dropdown is not shown, show it and hide others. If it is shown, navigate to the link
        if (dropdownLink.getAttribute("is-shown") == null) {
          dropdown.show();
          dropdownLink.setAttribute("is-shown", "true");
          dropdownLinks.forEach((otherLink) => {
            if (otherLink !== dropdownLink) {
              otherLink.removeAttribute("is-shown");
              const otherDropdown = bootstrap.Dropdown.getInstance(otherLink);
              if (otherDropdown) {
                otherDropdown.hide();
              }
            }
          });
        } else {
          dropdownLink.removeAttribute("is-shown");
          window.location.href = href;
        }
      } else {
        window.location.href = href; // Navigate to the link
      }
    },

    handleResize() {
      const wasMobile = this.isMobile;
      const nowMobile = window.innerWidth < 992;
      if (wasMobile !== nowMobile) {
        this.isMobile = nowMobile;
        this.adjustDropdownBehavior();
      }
    },

    adjustDropdownBehavior() {
      const navbar = document.querySelector(".navbar");
      const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle");
      dropdownLinks.forEach((dropdownLink) => {
        const dropdownMenu = dropdownLink.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.remove("fade-in", "fade-out", "show");
        }
        dropdownLink.closest("li")?.classList?.remove("show");
        const dropdown = bootstrap.Dropdown.getInstance(dropdownLink);
        dropdownLink.removeAttribute("is-shown"); // Reset mobile state
        (dropdownLink as HTMLAnchorElement).blur();
        if (dropdown) dropdown.hide(); // Ensure all dropdowns are closed on adjustment
      });
      if (this.dropdownHandlers.size > 0) {
        this.resetDropdownEventListeners();
      }
      if (!this.isMobile) {
        dropdownLinks.forEach((dropdownLink) => {
          // Initialize Bootstrap dropdown instance
          const dropdown = this.createBoostrapDropdown(dropdownLink);
          const dropdownMenu = dropdownLink.nextElementSibling;

          const boundHandleMouseEnter = () => this.handleMouseEnter(dropdown, dropdownMenu, dropdownLink);

          dropdownLink.addEventListener("mouseenter", boundHandleMouseEnter);

          const boundHandleClick = (e) => this.handleClick(e, dropdownLink, dropdown);

          dropdownLink.addEventListener("click", boundHandleClick);

          const boundHandleMouseLeave = () => this.handleMouseLeave(dropdown, dropdownMenu, dropdownLink);

          // Add mouseleave listener to parent so that the dropdown closes when exiting link/sibling elements (dropdown menu)
          const parentElem = dropdownLink.closest("li");
          if (parentElem) {
            parentElem.addEventListener("mouseleave", boundHandleMouseLeave);
          }

          // Add handlers to map for easy removal later
          this.addToDropdownHandlersMap(dropdownLink, "mouseenter", boundHandleMouseEnter);
          this.addToDropdownHandlersMap(parentElem || dropdownLink, "mouseleave", boundHandleMouseLeave);
          this.addToDropdownHandlersMap(dropdownLink, "click", boundHandleClick);
        });
      } else {
        dropdownLinks.forEach((dropdownLink) => {
          const dropdown = this.createBoostrapDropdown(dropdownLink);
          const boundHandleClick = (e) => this.handleClick(e, dropdownLink, dropdown);
          dropdownLink.addEventListener("click", boundHandleClick);

          this.addToDropdownHandlersMap(dropdownLink, "click", boundHandleClick);
        });
      }
    },
  },
  computed: {
    trimmedPathname() {
      return getTrimmedPathname(this.currentPath);
    },
  },

  // Makes navbar dropdowns open on hover
  // Ensure the DOM is fully loaded before running the script because Bootstrap's dropdown requires it
  mounted() {
    this.isMobile = window.innerWidth < 992;

    bootstrap.Dropdown.prototype._addEventListeners = function () {
      // Override Bootstrap’s internal method so no click listeners are ever bound
    };

    this.adjustDropdownBehavior();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.resetDropdownEventListeners();
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

a:focus {
  background: rgb(198, 198, 198);
  color: black;
  outline: none;
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
