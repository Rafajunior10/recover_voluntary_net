import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { supabase } from "./lib/supabase";
import { useRouter } from "expo-router";

const ResetPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handlePasswordReset = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            Alert.alert("Erro", error.message);
        } else {
            Alert.alert("Sucesso", "Senha redefinida com sucesso.");
            // Redireciona para login
            router.push("/"); 
        }
    };

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace("#", ""));
        const accessToken = params.get("access_token");

        if (accessToken) {
            supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: "",
            });
        }
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Redefinir Senha</Text>
                <Text style={styles.headerSubtitle}>
                    Insira sua nova senha abaixo
                </Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nova senha"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar nova senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Redefinir senha</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        marginBottom: 20,
        alignItems: "flex-start",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
        justifyContent: "center",
    },
    input: {
        height: 50,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#eb4f4f",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ResetPasswordScreen;
