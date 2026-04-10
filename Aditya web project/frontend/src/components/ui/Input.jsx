import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const Input = ({ label, icon: Icon, type = 'text', error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  return (
    <div className="relative mb-6">
      <div className={clsx(
        "group h-14 w-full glass rounded-xl transition-all duration-300 flex items-center px-4",
        isFocused ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-white/10",
        error ? "border-red-500/50" : ""
      )}>
        {Icon && (
          <Icon className={clsx(
            "w-5 h-5 mr-3 transition-colors duration-300",
            isFocused ? "text-indigo-400" : "text-gray-400 group-hover:text-gray-300"
          )} />
        )}
        
        <div className="relative flex-1">
          <input
            {...props}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            placeholder=""
            className={clsx(
              "w-full bg-transparent outline-none pt-2 text-sm",
              ((type === 'date' || type === 'time' || type === 'datetime-local') && !isFocused && !hasValue && !props.value) 
                ? "text-transparent" 
                : "text-white"
            )}
          />
          <label className={clsx(
            "absolute left-0 transition-all duration-300 pointer-events-none text-gray-400",
            (isFocused || hasValue || props.value) 
              ? "-top-1 text-xs text-indigo-400" 
              : "top-2 text-sm"
          )}>
            {label}
          </label>
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-xs mt-1 ml-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
