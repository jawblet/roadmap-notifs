const Grid = (props) => {

    const getGrid = (props) => { 
        const {
            columns,
            rows,
            gap,
            justify, 
            align,
            width,
            inline,
        } = props;
    
        return {
            display: inline ? "inline-grid" : "grid",
            gap: `${gap}rem` || "0",
            gridTemplateColumns: columns || "none",
            gridTemplateRows: rows || "none",
            justifyItems: justify || "stretch",
            alignItems: align || "stretch",
            width: width || "100%",
        }
    };

    return (
        <div style={getGrid(props)}
            className={props.className}>
            {props.children}
        </div>
    );
}
 
Grid.propTypes = {
    /** Grid or inline-grid  */
    inline: PropTypes.bool,
    /** Columns, ex. "minmax(10px, 1fr) 3fr", "repeat(5, 1fr)" */
    columns: PropTypes.string,
    /** Rows, ex. "min-content 1fr min-content", "15rem 1fr" */
    rows: PropTypes.string,
    /** Align items along grid main axis */
    justify: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    /** Align items along grid cross axis*/
    align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    /** Gap */
    gap: PropTypes.number, 
    /** Width */
    width: PropTypes.string,
    /** Custom classname */ 
    className: PropTypes.string 
}
 
export default Grid;