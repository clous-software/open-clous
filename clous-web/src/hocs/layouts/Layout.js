import { connect } from'react-redux';
import { motion } from "framer-motion";

/// Esto es lo que se carga, y dentro carga sus componentes

function Layout({ children }){
    return (
        /* initial={{ opacity: 0, transition: {duration: 0.5} }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0, transition: {duration: 0.5} }}
        > */
        <motion.div >
        
            {children}
        </motion.div>
    )
}

const mapStateToProps = state => ({
   
})

export default connect(mapStateToProps, {

})(Layout);
