<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import type { defaultSettings } from "../settings";
  import { type Executor, setupModule } from ".";
  const settings = getContext<Writable<typeof defaultSettings>>("settings");
  // Module Code

  let setup = false;

  const execute: Executor = {
    name: "AssignmentUnlocker",
    supports: ["manager"],
    loop() {
      if (!$settings.assignmentUnlocker) return;
      if (setup) return;
      setup = true;
      function readCookie(cookieName: string) {
        const matcher = cookieName + "=";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(matcher) == 0) {
            return cookie.substring(matcher.length, cookie.length);
          }
        }
        return "";
      }

      let oldUrl: string;
      let observerTimeout: number;

      function checkURL() {
        if (oldUrl != document.location.href) {
          oldUrl = document.location.href;
          clearTimeout(observerTimeout);
          console.log("url changed");
          if (
            oldUrl.indexOf("https://student.edgenuity.com/enrollment/") != -1
          ) {
            console.log("is timeline");
            tryToStartObserver();
          }
        }
      }
      function tryToStartObserver() {
        if (document.getElementsByClassName("course-timeline").length == 0) {
          setTimeout(tryToStartObserver, 100);
          console.log("cant find timeline. waiting");
          return;
        }
        const realm = JSON.parse(readCookie("TokenData")).Realm.toString();
        const enrollmentIndex =
          document.location.href.indexOf("enrollment") + 11;
        const enrollment = document.location.href.substring(
          enrollmentIndex,
          36,
        );
        const activityUrl = `//r${
          realm.length == 1 ? "0" : ""
        }${realm}.core.learn.edgenuity.com/lmsapi/sle/api/enrollments/${enrollment}/activity/`;

        for (var ActivityTile of document.getElementsByClassName(
          "ActivityTile-status-gated",
        )) {
          (ActivityTile as HTMLElement).onclick = () => {
            document.location = activityUrl + ActivityTile.id;
          };
        }
        function observerCallback(mutations: MutationRecord[]) {
          for (const mutation of mutations) {
            for (const _addedNode of mutation.addedNodes) {
              const addedNode = _addedNode as HTMLElement;
              if (
                addedNode.classList.contains("ActivityTile-status-gated") ||
                addedNode.classList.contains("ActivityTile-status-locked")
              ) {
                console.log("found locked button");
                addedNode.onclick = () => {
                  document.location = activityUrl + addedNode.id;
                };
              }
            }
          }
        }
        const observer = new MutationObserver(observerCallback);
        observer.observe(
          document.getElementsByClassName("course-timeline")[0],
          {
            attributes: false,
            childList: true,
            subtree: true,
          },
        );
      }
      setInterval(checkURL, 100);
      checkURL();
      if (oldUrl!.indexOf("https://student.edgenuity.com/enrollment/") != -1) {
        tryToStartObserver();
      }
    },
  };

  // SETUP CODE

  const logs = getContext<Writable<string[]>>("logs");
  const suppressErrors = getContext<Writable<boolean>>("suppressErrors");
  const loop = getContext<Writable<boolean>>("loop");
  const keyEvent = getContext<Writable<KeyboardEvent>>("keyEvent");
  setupModule(execute, { logs, loop, keyEvent, suppressErrors });
</script>
