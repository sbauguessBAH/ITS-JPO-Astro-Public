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
      dropdownHideTimeoutMap: new Map(),
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

    disposeDropdown(dropdownLink) {
      const dropdown = bootstrap.Dropdown.getInstance(dropdownLink);
      if (dropdown) {
        dropdown.dispose(); // Destroys dropdown instance, removing bootstrap's event listeners
      }
    },

    resetDropdownEventListeners() {
      const navbar = document.querySelector(".navbar");
      const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle");

      dropdownLinks.forEach((dropdownLink) => {
        if (this.dropdownHandlers.get(dropdownLink) != null) {
          // Remove from all elements associated with this dropdown link (the link, its parent li, and its menu)
          this.dropdownHandlers.get(dropdownLink).forEach(({ elem, type, handler }) => {
            elem.removeEventListener(type, handler);
          });
          this.dropdownHandlers.get(dropdownLink.closest("li"))?.forEach(({ elem, type, handler }) => {
            elem.removeEventListener(type, handler);
          });
          const dropdownMenu = dropdownLink.nextElementSibling;
          this.dropdownHandlers.get(dropdownMenu)?.forEach(({ elem, type, handler }) => {
            elem.removeEventListener(type, handler);
          });
        }
      });
      this.dropdownHandlers.clear();
    },

    furthest(element, selector) {
      // Find the furthest ancestor that matches the selector, opposite of built-in closest()
      let match = null;
      let current = element;

      while (current) {
        if (current.matches && current.matches(selector)) {
          match = current; // keep updating as long as it matches
        }
        current = current.parentElement;
      }

      return match;
    },

    closeDropdowns(exception = null) {
      const navbar = document.querySelector(".navbar");
      const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle");

      dropdownLinks.forEach((dropdownLink) => {
        if (!exception || dropdownLink !== exception) {
          dropdownLink.removeAttribute("is-shown");
          const dropdown = bootstrap.Dropdown.getInstance(dropdownLink);
          if (dropdown) {
            dropdown.hide();
          }
        }
      });
    },

    handleOutsideClick(e: MouseEvent) {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;

      // If the click happened outside the navbar, close dropdowns
      if (!navbar.contains(e.target as Node)) {
        this.closeDropdowns();
      }
    },

    handleMouseLeave(dropdown, dropdownMenu, dropdownLink, e) {
      if (dropdownMenu.contains(e.relatedTarget)) {
        return; // Ignore if moving within the dropdown menu
      }

      if (this.dropdownShowTimeout) {
        clearTimeout(this.dropdownShowTimeout); // Clear the timeout when leaving
        this.dropdownShowTimeout = null;
      }

      this.dropdownHideTimeoutMap.set(
        dropdownMenu.previousElementSibling?.textContent?.trim(),
        setTimeout(() => {
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
          this.dropdownHideTimeoutMap.delete(dropdownMenu.previousElementSibling?.textContent?.trim());
        }, 500)
      ); // Delay before hiding on mouse leave
    },

    handleMouseEnter(dropdown, dropdownMenu) {
      dropdownMenu!.classList.remove("fade-out");
      dropdownMenu!.classList.add("fade-in");
      // Store the last hovered dropdown and set the current one
      const existingTimeout = this.dropdownHideTimeoutMap.get(dropdownMenu.previousElementSibling?.textContent?.trim());
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        this.dropdownHideTimeoutMap.delete(dropdownMenu.previousElementSibling?.textContent?.trim());
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

      // Check if on mobile and if the dropdown should open on mobile (top-level dropdowns only)
      const openOnMobile = dropdownLink.getAttribute("data-open-on-mobile");

      // Check if on mobile for custom behavior, otherwise navigate to link
      if (this.isMobile && openOnMobile != null) {
        // If dropdown is not shown, show it and hide others. If it is shown, navigate to the link
        if (dropdownLink.getAttribute("is-shown") == null) {
          dropdown.show();
          dropdownLink.setAttribute("is-shown", "true");
          this.closeDropdowns(dropdownLink); // Close other dropdowns
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
    bindLinkEventListenersDesktop(dropdownLink: HTMLAnchorElement) {
      const dropdown = this.createBoostrapDropdown(dropdownLink);
      const dropdownMenu = dropdownLink.nextElementSibling;

      const boundHandleMouseEnter = () => this.handleMouseEnter(dropdown, dropdownMenu);

      dropdownLink.addEventListener("mouseenter", boundHandleMouseEnter);
      dropdownMenu!.addEventListener("mouseenter", boundHandleMouseEnter);

      const boundHandleFocus = () => this.handleMouseEnter(dropdown, dropdownMenu);
      dropdownLink.addEventListener("focus", boundHandleFocus);

      // Blur (when tabbing away) → close dropdown
      const boundHandleBlur = (e) => {
        // only close if focus leaves both link and menu
        if (!dropdownMenu!.contains(e.relatedTarget)) {
          this.handleMouseLeave(dropdown, dropdownMenu, dropdownLink, e);
        }
      };

      dropdownLink.addEventListener("blur", boundHandleBlur);
      dropdownMenu!.addEventListener("blur", boundHandleBlur, true);

      const boundHandleClick = (e) => this.handleClick(e, dropdownLink, dropdown);

      dropdownLink.addEventListener("click", boundHandleClick);

      const boundHandleMouseLeave = (e) => this.handleMouseLeave(dropdown, dropdownMenu, dropdownLink, e);

      // Add mouseleave listener to parent so that the dropdown closes when exiting link/sibling elements (dropdown menu)
      const parentElem = dropdownLink.closest("li");
      if (parentElem) {
        parentElem.addEventListener("mouseleave", boundHandleMouseLeave);
      }

      // Add handlers to map for easy removal later
      this.addToDropdownHandlersMap(dropdownLink, "mouseenter", boundHandleMouseEnter);
      this.addToDropdownHandlersMap(dropdownMenu!, "mouseenter", boundHandleMouseEnter);
      this.addToDropdownHandlersMap(dropdownLink, "focus", boundHandleFocus);
      this.addToDropdownHandlersMap(dropdownLink, "blur", boundHandleBlur);
      this.addToDropdownHandlersMap(dropdownMenu!, "blur", boundHandleBlur);
      this.addToDropdownHandlersMap(parentElem || dropdownLink, "mouseleave", boundHandleMouseLeave);
      this.addToDropdownHandlersMap(dropdownLink, "click", boundHandleClick);
    },

    resetDropdownState(dropdownLink: HTMLAnchorElement) {
      const dropdownMenu = dropdownLink.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.remove("fade-in", "fade-out", "show");
      }
      dropdownLink.closest("li")?.classList?.remove("show");
      const dropdown = bootstrap.Dropdown.getInstance(dropdownLink);
      dropdownLink.removeAttribute("is-shown"); // Reset mobile state
      dropdownLink.blur(); // Removes :focus state from link
      if (dropdown) dropdown.hide(); // Ensure all dropdowns are closed on adjustment
    },

    bindLinkEventListenersMobile(dropdownLink: HTMLAnchorElement) {
      const dropdown = this.createBoostrapDropdown(dropdownLink);
      const boundHandleClick = (e) => this.handleClick(e, dropdownLink, dropdown);
      dropdownLink.addEventListener("click", boundHandleClick);

      this.addToDropdownHandlersMap(dropdownLink, "click", boundHandleClick);
    },

    adjustDropdownBehavior() {
      // Get all dropdown links (<a> elements with .dropdown-toggle class)
      const navbar = document.querySelector(".navbar");
      const dropdownLinks = navbar!.querySelectorAll(".dropdown-toggle") as NodeListOf<HTMLAnchorElement>;

      // Reset all dropdowns to initial state - remove classes/:focus and hide
      dropdownLinks.forEach((dropdownLink) => {
        this.resetDropdownState(dropdownLink);
      });

      // If there are existing handlers, remove them all before re-adding
      if (this.dropdownHandlers.size > 0) {
        this.resetDropdownEventListeners();
        dropdownLinks.forEach((dropdownLink) => this.disposeDropdown(dropdownLink));
      }

      // Add appropriate event listeners based on current screen size
      if (!this.isMobile) {
        dropdownLinks.forEach((dropdownLink) => {
          this.bindLinkEventListenersDesktop(dropdownLink);
        });
      } else {
        dropdownLinks.forEach((dropdownLink) => {
          this.bindLinkEventListenersMobile(dropdownLink);
          dropdownLink.classList.add("mobileLink"); // Add mobile class to change arrow direction
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
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("click", this.handleOutsideClick);
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

#navbar-content > * {
  z-index: 1000;
}

.dropend ul {
  margin-left: -0.1px !important; /* Prevents gap between dropend and menu items, which closes dropend on hover */
}
</style>
