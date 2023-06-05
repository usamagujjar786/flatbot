// vite.config.ts
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import zipPack from "vite-plugin-zip-pack";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "create-chrome-ext",
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
      js: ["src/content/index.ts"]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9yZWFkX3BhZ2VzX2ZvbGRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB6aXBQYWNrIGZyb20gJ3ZpdGUtcGx1Z2luLXppcC1wYWNrJztcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vc3JjL21hbmlmZXN0J1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL3NyYy9yZWFkX3BhZ2VzX2ZvbGRlcidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiBjb25maWcsXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtoYXNoXS5qcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSksIHJlYWN0KCksIHppcFBhY2soe1xuICAgICAgb3V0RGlyOiBgcGFja2FnZWAsXG4gICAgICBpbkRpcjogJ2J1aWxkJyxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIG91dEZpbGVOYW1lOiBgJHttYW5pZmVzdC5zaG9ydF9uYW1lICYmIG1hbmlmZXN0Lm5hbWUucmVwbGFjZUFsbChcIiBcIiwgXCItXCIpfS1leHRlbnNpb24tdiR7bWFuaWZlc3QudmVyc2lvbn0uemlwYCxcbiAgICB9KSxdLFxuICB9XG59KVxuIiwgImltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XG4gIG5hbWU6ICdjcmVhdGUtY2hyb21lLWV4dCcsXG4gIGRlc2NyaXB0aW9uOiAnJyxcbiAgdmVyc2lvbjogJzAuMC4wJyxcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAnMTYnOiAnaW1nL2xvZ28tMTYucG5nJyxcbiAgICAnMzInOiAnaW1nL2xvZ28tMzQucG5nJyxcbiAgICAnNDgnOiAnaW1nL2xvZ28tNDgucG5nJyxcbiAgICAnMTI4JzogJ2ltZy9sb2dvLTEyOC5wbmcnLFxuICB9LFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAncG9wdXAuaHRtbCcsXG4gICAgZGVmYXVsdF9pY29uOiAnaW1nL2xvZ28tNDgucG5nJyxcbiAgfSxcbiAgb3B0aW9uc19wYWdlOiAnb3B0aW9ucy5odG1sJyxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxuICAgIHR5cGU6ICdtb2R1bGUnLFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJ2h0dHA6Ly8qLyonLCAnaHR0cHM6Ly8qLyonXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2luZGV4LnRzJ10sXG4gICAgfSxcbiAgXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2LnBuZycsICdpbWcvbG9nby0zNC5wbmcnLCAnaW1nL2xvZ28tNDgucG5nJywgJ2ltZy9sb2dvLTEyOC5wbmcnXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCIsIFwiZGVjbGFyYXRpdmVDb250ZW50XCIsIFwiYWN0aXZlVGFiXCIsIFwic2NyaXB0aW5nXCJdLFxufSlcbiIsICJpbXBvcnQgZ2xvYlN5bmMgZnJvbSAnZ2xvYic7XG5cbmNvbnN0IHBhZ2VzID0gYXdhaXQgZ2xvYlN5bmMoJ3BhZ2VzLyouaHRtbCcpXG5cbmNvbnN0IGFycmF5S2V5VmFsdWVQYWlycyA9IHBhZ2VzLm1hcChmaWxlID0+IFtmaWxlLnNwbGl0KCdcXFxcJykuc2xpY2UoLTEpLnRvU3RyaW5nKCkuc3BsaXQoJy5odG1sJykuam9pbignJyksIGZpbGVdKVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0gT2JqZWN0LmZyb21FbnRyaWVzKGFycmF5S2V5VmFsdWVQYWlycylcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQVc7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTs7O0FDSHBCLFNBQVMsc0JBQXNCO0FBRS9CLElBQU8sbUJBQVEsZUFBZTtBQUFBLEVBQzVCLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkLFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsY0FBYyxhQUFhO0FBQUEsTUFDckMsSUFBSSxDQUFDLHNCQUFzQjtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsSUFDeEI7QUFBQSxNQUNFLFdBQVcsQ0FBQyxtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0I7QUFBQSxNQUN2RixTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBYSxDQUFDLFdBQVcsc0JBQXNCLGFBQWEsV0FBVztBQUN6RSxDQUFDOzs7QUNuQ0QsT0FBTyxjQUFjO0FBRXJCLElBQU0sUUFBUSxNQUFNLFNBQVMsY0FBYztBQUUzQyxJQUFNLHFCQUFxQixNQUFNLElBQUksVUFBUSxDQUFDLEtBQUssTUFBTSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztBQUUzRyxJQUFNLFNBQVMsT0FBTyxZQUFZLGtCQUFrQjs7O0FGSTNELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVMsQ0FBQyxJQUFJLEVBQUUsMkJBQVMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxRQUFRO0FBQUEsTUFDNUMsUUFBUTtBQUFBLE1BQ1IsT0FBTztBQUFBLE1BRVAsYUFBYSxHQUFHLGlCQUFTLGNBQWMsaUJBQVMsS0FBSyxXQUFXLEtBQUssR0FBRyxnQkFBZ0IsaUJBQVM7QUFBQSxJQUNuRyxDQUFDLENBQUU7QUFBQSxFQUNMO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
