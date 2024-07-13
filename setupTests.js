/* To be able to use these matchers we need to extend
the Jest's expect object. This can be done by using a global setup file. 
configure this file as a setup file in the Jest's configuration in the package.json file 
*/

import '@testing-library/jest-native/extend-expect'
