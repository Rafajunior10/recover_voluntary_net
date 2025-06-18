import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";
import { useRouter } from "expo-router";
import BottomNav from "../components/navBar/bottomNav";

const ProfileScreen = () => {
    const [userData, setUserData] = useState({ nome: "", email: "" });
    const router = useRouter();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            console.error("Usuário não está logado.");
            return;
        }

        const { data, error } = await supabase
            .from("users")
            .select("nome,email")
            .eq("user_id", user.id)
            .single();

        if (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        } else {
            setUserData({ nome: data.nome, email: data.email });
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.navTextBold}>
                    Olá {userData.nome || "Usuário"}!
                </Text>
                <TouchableOpacity onPress={signOut}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color="#eb4f4f"
                    style={styles.profileIcon}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.value}>{userData.nome || "Usuário"}</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>
                        {userData.email || "email@exemplo.com"}
                    </Text>
                </View>
            </View>

            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },

    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        backgroundColor: "#eb4f4f",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    navTextBold: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    profileIcon: {
        marginBottom: 20,
    },
    infoContainer: {
        alignSelf: "flex-start",
        width: "100%",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#666",
        marginBottom: 12,
    },
});

export default ProfileScreen;
