// vite.config.ts
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import zipPack from "vite-plugin-zip-pack";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "Flatbot",
  description: "",
  version: "0.0.0",
  manifest_version: 3,
  icons: {
    "16": "img/logo-16.png",
    "32": "img/logo-34.png",
    "48": "img/logo-48.png",
    "128": "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content/index.ts", "public/scripts/stripe.js"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: ["storage", "declarativeContent", "activeTab", "scripting"]
});

// src/read_pages_folder.ts
import globSync from "glob";
var pages = await globSync("pages/*.html");
var arrayKeyValuePairs = pages.map((file) => [file.split("\\").slice(-1).toString().split(".html").join(""), file]);
var config = Object.fromEntries(arrayKeyValuePairs);

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [crx({ manifest: manifest_default }), react(), zipPack({
      outDir: `package`,
      inDir: "build",
      outFileName: `${manifest_default.short_name && manifest_default.name.replaceAll(" ", "-")}-extension-v${manifest_default.version}.zip`
    })]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9yZWFkX3BhZ2VzX2ZvbGRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB6aXBQYWNrIGZyb20gJ3ZpdGUtcGx1Z2luLXppcC1wYWNrJztcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vc3JjL21hbmlmZXN0J1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL3NyYy9yZWFkX3BhZ2VzX2ZvbGRlcidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiBjb25maWcsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtoYXNoXS5qcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSksIHJlYWN0KCksIHppcFBhY2soe1xuICAgICAgb3V0RGlyOiBgcGFja2FnZWAsXG4gICAgICBpbkRpcjogJ2J1aWxkJyxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIG91dEZpbGVOYW1lOiBgJHttYW5pZmVzdC5zaG9ydF9uYW1lICYmIG1hbmlmZXN0Lm5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCItXCIpfS1leHRlbnNpb24tdiR7bWFuaWZlc3QudmVyc2lvbn0uemlwYCxcbiAgICB9KSxdLFxuICB9XG59KVxuIiwgImltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XG4gIG5hbWU6ICdGbGF0Ym90JyxcbiAgZGVzY3JpcHRpb246ICcnLFxuICB2ZXJzaW9uOiAnMC4wLjAnLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBpY29uczoge1xuICAgICcxNic6ICdpbWcvbG9nby0xNi5wbmcnLFxuICAgICczMic6ICdpbWcvbG9nby0zNC5wbmcnLFxuICAgICc0OCc6ICdpbWcvbG9nby00OC5wbmcnLFxuICAgICcxMjgnOiAnaW1nL2xvZ28tMTI4LnBuZycsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpbWcvbG9nby00OC5wbmcnLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6ICdvcHRpb25zLmh0bWwnLFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnaHR0cDovLyovKicsICdodHRwczovLyovKiddLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnQvaW5kZXgudHMnLCAncHVibGljL3NjcmlwdHMvc3RyaXBlLmpzJ10sXG4gICAgfSxcbiAgXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2LnBuZycsICdpbWcvbG9nby0zNC5wbmcnLCAnaW1nL2xvZ28tNDgucG5nJywgJ2ltZy9sb2dvLTEyOC5wbmcnXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCIsIFwiZGVjbGFyYXRpdmVDb250ZW50XCIsIFwiYWN0aXZlVGFiXCIsIFwic2NyaXB0aW5nXCJdLFxufSlcbiIsICJpbXBvcnQgZ2xvYlN5bmMgZnJvbSAnZ2xvYic7XG5cbmNvbnN0IHBhZ2VzID0gYXdhaXQgZ2xvYlN5bmMoJ3BhZ2VzLyouaHRtbCcpXG5cbmNvbnN0IGFycmF5S2V5VmFsdWVQYWlycyA9IHBhZ2VzLm1hcChmaWxlID0+IFtmaWxlLnNwbGl0KCdcXFxcJykuc2xpY2UoLTEpLnRvU3RyaW5nKCkuc3BsaXQoJy5odG1sJykuam9pbignJyksIGZpbGVdKVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0gT2JqZWN0LmZyb21FbnRyaWVzKGFycmF5S2V5VmFsdWVQYWlycylcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQVc7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTs7O0FDSHBCLFNBQVMsc0JBQXNCO0FBRS9CLElBQU8sbUJBQVEsZUFBZTtBQUFBLEVBQzVCLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkLFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsY0FBYyxhQUFhO0FBQUEsTUFDckMsSUFBSSxDQUFDLHdCQUF3QiwwQkFBMEI7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLDBCQUEwQjtBQUFBLElBQ3hCO0FBQUEsTUFDRSxXQUFXLENBQUMsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCO0FBQUEsTUFDdkYsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWEsQ0FBQyxXQUFXLHNCQUFzQixhQUFhLFdBQVc7QUFDekUsQ0FBQzs7O0FDbkNELE9BQU8sY0FBYztBQUVyQixJQUFNLFFBQVEsTUFBTSxTQUFTLGNBQWM7QUFFM0MsSUFBTSxxQkFBcUIsTUFBTSxJQUFJLFVBQVEsQ0FBQyxLQUFLLE1BQU0sSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFFM0csSUFBTSxTQUFTLE9BQU8sWUFBWSxrQkFBa0I7OztBRkkzRCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTLENBQUMsSUFBSSxFQUFFLDJCQUFTLENBQUMsR0FBRyxNQUFNLEdBQUcsUUFBUTtBQUFBLE1BQzVDLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUVQLGFBQWEsR0FBRyxpQkFBUyxjQUFjLGlCQUFTLEtBQUssV0FBVyxLQUFLLEdBQUcsZ0JBQWdCLGlCQUFTO0FBQUEsSUFDbkcsQ0FBQyxDQUFFO0FBQUEsRUFDTDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
