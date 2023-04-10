export default function Root(props) {
  let bt =  {
    "font": "400 11px system-ui",
    "padding": "1px 7px 2px",
    "border-width": "1px",
    "border-style": "solid",
    "width":"50px",
    "height":"50px",
    "border-color": "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)"
};
  return (
    <>
    <a style={bt} href="/#/home">Home</a>
    <a style={bt} href="/#/about">ABout</a>
    </>
  )
}
