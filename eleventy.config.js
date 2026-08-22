module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "." });
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  eleventyConfig.addFilter("ymd", function (d) {
    const dt = d ? new Date(d) : new Date();
    const p = (n) => String(n).padStart(2, "0");
    return dt.getUTCFullYear() + "." + p(dt.getUTCMonth() + 1) + "." + p(dt.getUTCDate());
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date);
  });

  return {
    dir: { input: "content", includes: "../_includes", data: "../_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
