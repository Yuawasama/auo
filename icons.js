/* ============================================================
   艾瑟兰编年史 · 自绘 SVG 图标库
   统一风格：24x24 viewBox，1.6 描边，圆头线帽，currentColor
   ============================================================ */
const ICON_PATHS = {
  // 种族
  human:   '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/>',
  elf:     '<path d="M12 3l7 9-7 9-7-9z"/><path d="M12 7v10"/>',
  dwarf:   '<path d="M4 16h16"/><path d="M7 16V9l5-4 5 4v7"/><path d="M10 16v-4h4v4"/>',
  orc:     '<path d="M12 3l8 5v8l-8 5-8-5V8z"/><path d="M8 10l4 2 4-2M8 14h8"/>',
  halfling:'<circle cx="9" cy="14" r="4.5"/><circle cx="15" cy="10" r="4.5"/>',
  dragon:  '<path d="M12 3l9 5.5-9 5.5-9-5.5z"/><path d="M12 14v7M6 19h12"/>',
  demon:   '<path d="M12 3l3 5h-6z"/><path d="M12 8v13M5 12l7 4 7-4"/>',
  angel:   '<circle cx="12" cy="9" r="4"/><path d="M4 20c2-4 5-6 8-6s6 2 8 6"/>',
  undead:  '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="5"/>',
  fae:     '<path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>',

  // 行动
  explore: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  train:   '<path d="M5 19l6-6M14 5l5 5-9 9H5v-5z"/><path d="M14 5l2-2 5 5-2 2"/>',
  work:    '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2"/><path d="M3 12.5h18"/>',
  social:  '<path d="M8 4h8l-1.5 5H9.5z"/><path d="M9.5 9L7 20h10L14.5 9"/><path d="M9 13h6"/>',
  life:    '<path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z"/>',
  year:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
  main:    '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 11h6M9 15h6"/>',
  sub:     '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12l2 2 4-4"/>',
  dice:    '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2"/><circle cx="15" cy="15" r="1.2"/><circle cx="15" cy="9" r="1.2"/><circle cx="9" cy="15" r="1.2"/>',
  save:    '<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4"/><rect x="8" y="13" width="8" height="7"/>',
  menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
  book:    '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15"/><path d="M8 8h8M8 11.5h5"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20 4v5h-5"/>',
  coffee:  '<path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3v2M12 3v2"/>',
  male:    '<circle cx="12" cy="13" r="5.5"/><path d="M16 9l4-4M16 5h4v4"/>',
  female:  '<circle cx="12" cy="9" r="5.5"/><path d="M12 14.5V21M9 18h6"/>',
  other:   '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v.01M12 11v5"/>',
  skip:    '<path d="M5 5l7 7-7 7z"/><path d="M14 5l7 7-7 7z"/>',
  confess: '<path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z"/><path d="M9.5 11l1.8 1.8L15 9"/>',
  wait:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  walk:    '<circle cx="13" cy="5" r="2"/><path d="M13 8l-3 4 2 3-1 5M10 12l-3 2M12 15l4 1 1 4"/>',
  baby:    '<circle cx="12" cy="11" r="6"/><path d="M9.5 10h.01M14.5 10h.01"/><path d="M10 14c.8.7 2.2.7 3 0"/><path d="M12 5V3"/>',
  home:    '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
  gold:    '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4"/>',
  magic:   '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  int:     '<path d="M9 4a4 4 0 0 0-1 7.9V15h8v-3.1A4 4 0 0 0 15 4z"/><path d="M9 18h6M10 21h4"/>',
  phy:     '<path d="M7 4v7a5 5 0 0 0 10 0V4"/><path d="M4 4h3M17 4h3M4 11h3M17 11h3"/><path d="M12 16v5"/>',
  skull:   '<path d="M12 3c-4 0-7 3-7 7 0 2.5 1.2 4.3 3 5.5V19h8v-3.5c1.8-1.2 3-3 3-5.5 0-4-3-7-7-7z"/><circle cx="9.5" cy="10" r="1.2"/><circle cx="14.5" cy="10" r="1.2"/><path d="M11 15h2"/>',
  crown:   '<path d="M4 17l1.5-9 4 4L12 6l2.5 6 4-4L20 17z"/><path d="M4 17h16v2H4z"/>',
  star:    '<path d="M12 3l2.6 6.2L21 10l-5 4.3 1.6 6.7L12 17.4 6.4 21 8 14.3 3 10l6.4-.8z"/>',
  gift:    '<rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 13h18M12 9v11"/><path d="M12 9C10 9 8 8 8 6a2 2 0 0 1 4 0c0 2 0 3 0 3zM12 9c2 0 4-1 4-3a2 2 0 0 0-4 0c0 2 0 3 0 3z"/>',
  heart:   '<path d="M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z"/>',
  coin:    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  scroll:  '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h4"/>'
};

/* 生成内联 SVG 字符串 */
function icon(name, size){
  const p = ICON_PATHS[name] || ICON_PATHS.star;
  const s = size || 20;
  return '<svg class="ico" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" '+
         'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
}
