import { Outlet } from "react-router-dom";
import { PageContainer } from "./PageContainer";
import { motion } from "framer-motion";

export const MainLayout = () => (
  <PageContainer withHeader withBottomNav maxWidth="md">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Outlet /> 
    </motion.div>
  </PageContainer>
);
